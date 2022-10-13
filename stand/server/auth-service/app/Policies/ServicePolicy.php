<?php

namespace App\Policies;

use Egal\Core\Session\Session;

class ServicePolicy
{

    public static function login(): bool
    {
        return Session::getAuthEntity()->isGuest();
    }

    public static function logged(): bool
    {
        return Session::getAuthEntity()->isGuest();
    }

    public static function loginToService(): bool
    {
        return Session::getAuthEntity()->isGuest();
    }

    public static function loggedToService(): bool
    {
        return Session::getAuthEntity()->isGuest();
    }

}
