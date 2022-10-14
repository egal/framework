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
     * @throws \Exception|NoAccessActionCallException
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
        return $this->modelMetadata->hasPolicy();
    }

    /**
     * Generates valid parameters based on {@see \Egal\Core\ActionCaller\ActionCaller::modelActionMetadata}.
     *
     * If it is impossible to generate valid parameters, an exception is thrown.
     *
     * @return array
     * @throws ActionParameterValidateException
     */
    private function getValidActionParameters(): array
    {
        $parametersValidationRules = $this->modelActionMetadata->getValidationRules();
        $actionParameters = $this->actionParameters;
        $defaultParameters = [];

        $missingParameters = array_filter(
            $this->modelActionMetadata->getParameters(),
            fn (ActionParameterMetadata $parameter) => !array_key_exists($parameter->getName(), $actionParameters)
        );

        $notAllowedParameters = array_filter(
            $actionParameters,
            fn ($actionParameter) => $this->modelActionMetadata->parameterExist($actionParameter)
        );

        /** @var ActionParameterMetadata $parameter */
        foreach ($missingParameters as $parameter) {
            if (!$parameter->isNullVariableReplaceableWithDefault()) {
                continue;
            }

            $defaultParameters[$parameter->getName()] = $parameter->getDefault();
        }

        $actionParameters = array_merge($actionParameters, $defaultParameters);
        $validator = Validator::make($actionParameters, $parametersValidationRules);

        if ($validator->fails() || $notAllowedParameters != []) {
            $exception = new ActionParameterValidateException();
            $exception->setMessageBag($validator->errors());

            foreach ($notAllowedParameters as $key => $parameter) {
                $exception->mergeMessage("Parameter $key not allowed here!");
            }

            throw $exception;
        }

        return $actionParameters;
    }

}
