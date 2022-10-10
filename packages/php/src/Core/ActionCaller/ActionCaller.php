<?php

declare(strict_types=1);

namespace Egal\Core\ActionCaller;

use Egal\Core\Exceptions\ActionParameterValidateException;
use Egal\Core\Exceptions\NoAccessActionCallException;
use Egal\Core\Session\Session;
use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Illuminate\Support\Facades\Validator;

/**
 * Class ActionCaller.
 *
 * Designed to call Actions on Models.
 */
class ActionCaller
{

    /**
     * Parameters of the called action.
     *
     * @var mixed
     */
    protected array $actionParameters = [];

    /**
     * Model Metadata for which Action is called.
     */
    private ModelMetadata $modelMetadata;

    /**
     * Model Action Metadata for which Action is called.
     */
    private ActionMetadata $modelActionMetadata;

    /**
     * ActionCaller constructor.
     *
     * @throws \Exception
     */
    public function __construct(string $modelName, string $actionName, array $actionParameters = [])
    {
        $this->modelMetadata = ModelMetadataManager::getModelMetadata($modelName);
        $this->modelActionMetadata = $this->modelMetadata->getAction($actionName);
        $this->actionParameters = $actionParameters;
    }

    /**
     * Calling action.
     *
     * If not available to call, an {@see \Egal\Core\Exceptions\NoAccessActionCallException} is thrown.
     *
     * @return mixed Result of action execution.
     * @throws \Exception|\ReflectionException|\Egal\Core\Exceptions\ActionCallException|\Egal\Core\Exceptions\NoAccessActionCallException
     */
    public function call()
    {
        if (Session::isAuthEnabled() && !$this->isAccessedForCall()) {
            throw new NoAccessActionCallException();
        }

        return call_user_func_array(
            [
                $this->modelMetadata->getModelClass(),
                $this->modelActionMetadata->getMethodName(),
            ],
            $this->getValidActionParameters()
        );
    }

    /**
     * Checks if the action call is available for current session.
     *
     * @throws \Exception
     */
    private function isAccessedForCall(): bool
    {
        return $this->modelMetadata->hasPolicies();
    }

    /**
     * Checks if the action call is available for calling service.
     *
     * @throws \Egal\Core\Exceptions\CurrentSessionException
     */
    private function isServiceAccess(): bool
    {
        if (!Session::isServiceServiceTokenExists()) {
            return false;
        }

        $serviceName = Session::getServiceServiceToken()->getServiceName();

        // TODO: разиловать проверку выданного сервису доступа до эндпоинта
        return in_array($serviceName, $this->modelActionMetadata->getServicesAccess());
    }

    /**
     * Checks if the action call is available for calling user.
     *
     * @throws \Exception
     */
    private function isUserAccess(): bool
    {
        if (!Session::isUserServiceTokenExists()) {
            return false;
        }

        // TODO: реализовать проверку выданного пользователю доступа до эндпоинта по статусу, по роли, по permission
        return in_array(Session::getAuthStatus(), $this->modelActionMetadata->getStatusesAccess())
            && $this->userHasAccessWithCurrentRoles()
            && $this->userHasAccessWithCurrentPermissions();
    }

    /**
     * Checks if the action call is available for calling user with current roles.
     *
     * @throws \Exception
     * TODO: Переименовать!
     * TODO: Реализовать
     */
    private function userHasAccessWithCurrentRoles(): bool
    {
        if (count($this->modelActionMetadata->getRolesAccess()) === 0) {
            return true;
        }

        foreach ($this->modelActionMetadata->getRolesAccess() as $rolesAccess) {
            $userRoles = Session::getUserServiceToken()->getRoles();

            if (count(array_intersect($userRoles, $rolesAccess)) === count($rolesAccess)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks if the action call is available for calling user with current permissions.
     *
     * @throws \Exception
     * TODO: Переименовать!
     * TODO: реализовать
     */
    private function userHasAccessWithCurrentPermissions(): bool
    {
        if (count($this->modelActionMetadata->getPermissionsAccess()) === 0) {
            return true;
        }

        foreach ($this->modelActionMetadata->getPermissionsAccess() as $permissionsAccess) {
            $userPermissions = Session::getUserServiceToken()->getPermissions();

            if (count(array_intersect($userPermissions, $permissionsAccess)) === count($permissionsAccess)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Формирует из {@see \Egal\Core\ActionCaller\ActionCaller::modelActionMetadata} валидные параметры.
     *
     * If it is impossible to generate valid parameters, an exception is thrown.
     * TODO: реализовать проверку на: isDefaultValueAvailable(), allowsNull() - для случаев, когда не передается необходимый для action параметр
     * @return array
     * @throws ActionParameterValidateException
     */
    private function getValidActionParameters(): array
    {
        $parametersValidationRules = $this->modelActionMetadata->getValidationRules();
        $actionParameters = $this->actionParameters;

        $missingParameters = array_filter(
            $this->modelActionMetadata->getParameters(),
            fn (ActionParameterMetadata $parameter) => !array_key_exists($parameter->getName(), $actionParameters)
        );
        $defaultParameters = [];

        /** @var ActionParameterMetadata $parameter */
        foreach ($missingParameters as $parameter) {
            if (!$this->isDefaultValueAvailable($parameter)) {
                continue;
            }

            $defaultParameters[$parameter->getName()] = $parameter->getDefault();
        }

        $actionParameters = array_merge($actionParameters, $defaultParameters);
        $validator = Validator::make($actionParameters, $parametersValidationRules);

        if ($validator->fails()) {
            $exception = new ActionParameterValidateException();
            $exception->setMessageBag($validator->errors());

            throw $exception;
        }

        return $actionParameters;
    }

    private function isDefaultValueAvailable(ActionParameterMetadata $parameter): bool
    {
        return !($parameter->getDefault() === null && !$parameter->isNullable());
    }

}
