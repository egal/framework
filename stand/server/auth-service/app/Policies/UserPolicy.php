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

    public static function registered(): bool
    {
        return Session::getAuthEntity()->isGuest();
    }

    public static function login(): bool
    {
        return Session::getAuthEntity()->isGuest();
    }

    public static function register(): bool
    {
        return Session::getAuthEntity()->isGuest();
    }

    public static function loginToService(): bool
    {
        return Session::getAuthEntity()->isGuest();
    }

    public static function refreshUserMasterToken(): bool
    {
        return Session::getAuthEntity()->isGuest();
    }

}
