<?php

namespace App\Policies;

use Egal\Core\Session\Session;
use Illuminate\Support\Facades\Gate;

class UserPolicy
{

    public static function registering(): bool
    {
        $authEntity = Session::getAuthEntity();
        return $authEntity->isService() && $authEntity->service === 'core';
    }

}
