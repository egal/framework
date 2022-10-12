<?php

declare(strict_types=1);

namespace Egal\Auth\Entities;

use Egal\Auth\Exceptions\NoAccessForActionException;
use Egal\Core\Session\Session;
use Egal\Model\Exceptions\NotFoundException;
use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Model;

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
dump($methodName);
        if (! method_exists($this, $methodName)) {
            throw new NotFoundException();
        }

        return call_user_func_array([$this, $methodName], $arguments) ?: throw new NoAccessForActionException;
    }


    public function may(string|Model $model, string $ability): bool
    {
        if ($model instanceof Model) {
            $result = array_map(fn(string $policy) => call_user_func_array([$policy, $ability], [$model]), ModelMetadataManager::getModelMetadata(class_basename(get_class($model)))->getPolicies());
            return ! in_array(false, $result);
        }
        if (class_exists($model)) {
            $result = array_map(fn(string $policy) => call_user_func_array([$policy, $ability], []), ModelMetadataManager::getModelMetadata($model)->getPolicies());
            return ! in_array(false, $result);
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
