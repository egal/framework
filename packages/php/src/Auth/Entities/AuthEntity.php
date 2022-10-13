<?php

declare(strict_types=1);

namespace Egal\Auth\Entities;

use Egal\Auth\Exceptions\NoAccessForActionException;
use Egal\Model\Exceptions\NotFoundException;
use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Model;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @method bool isUserOrFail()
 * @method bool mayOrFail(string|Model $model, string $ability)
 * @method bool isGuestOrFail()
 * @method bool isServiceOrFail()
 */
abstract class AuthEntity
{

    /**
     * @throws NoAccessForActionException
     * @throws NotFoundException
     */
    public function __call(string $name, array $arguments): bool
    {
        $methodName = preg_replace("/OrFail/", '', $name);
        if (!method_exists($this, $methodName)) {
            trigger_error('Call to undefined method '.__CLASS__.'::'.$name.'()', E_USER_ERROR);
        }

        return call_user_func_array([$this, $methodName], $arguments) ?: throw new NoAccessForActionException;
    }


    public function may(string|Model $model, string $ability): bool
    {
        if ($model instanceof Model || class_exists($model)) {
            $modelClass = is_string($model) ? $model : get_class($model);
            $countDenies = count(
                array_filter(
                    ModelMetadataManager::getModelMetadata($modelClass)->getPolicies(),
                    fn(string $policy) => method_exists($policy, $ability) && !call_user_func_array([$policy, $ability], [$model])
                )
            );
            $countPolicies = count(
                array_filter(
                    ModelMetadataManager::getModelMetadata($modelClass)->getPolicies(),
                    fn(string $policy) => method_exists($policy, $ability)
                )
            );
            return $countDenies === 0 && $countPolicies > 0;
        }

        return false;
    }

    public function isUser(): bool
    {
        return $this instanceof User;
    }

    public function isGuest(): bool
    {
        return $this instanceof Guest;
    }

    public function isService(): bool
    {
        return $this instanceof Service;
    }

}
