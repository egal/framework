<?php

namespace Egal\AuthServiceDependencies\Entities;

use Egal\Auth\Exceptions\NoAccessForActionException;
use Egal\Model\Model;

abstract class AuthEntity
{

    /**
     * @throws NoAccessForActionException
     */
    public function mayOrFail(string $name, ?Model $model = null): bool
    {
//            throw new NoAccessForActionException;

        return true;
    }

    public function may(string $name, ?Model $model = null): bool
    {
        return true;
    }

}
