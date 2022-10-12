<?php

namespace App\Policies;

use Egal\Core\Session\Session;
use Illuminate\Support\Facades\Gate;

class UserPolicy
{

    public static function registering(): bool
    {
        return Session::getAuthEntity()->isGuest();
    }

}
