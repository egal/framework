<?php

namespace Egal\Auth\Entities;

use Egal\Auth\Exceptions\NoAccessForActionException;
use Egal\Core\Session\Session;
use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Model;

abstract class AuthEntity
{

    /**
     * TODO: Usage Session::getAuthEntity()->mayOrFail($this->modelActionMetadata->getMethodName(), $this->modelMetadata->getModelShortName());
     *
     * @param  string  $ability
     * @param  array|mixed  $arguments
     * @throws NoAccessForActionException
     */
    public function mayOrFail(string $ability, mixed $arguments = []): bool
    {
        return $this->may($ability, $arguments) ?: throw new NoAccessForActionException;
    }

    /**
     * @param  string  $ability
     * @param  array|mixed  $arguments
     * @throws NoAccessForActionException
     */
    public function may(string $ability, mixed $arguments = []): bool
    {
        if (class_exists($arguments)) {
            $result = array_map(fn(string $policy) => call_user_func($policy, $ability), ModelMetadataManager::getModelMetadata($arguments)->getPolicies());
            return in_array(false, $result);
        }

        return false;
    }

}
