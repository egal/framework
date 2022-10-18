<?php

namespace App\Policies;

use Egal\Core\Session\Session;
use Illuminate\Support\Facades\Gate;

class UserPolicy
{

    public static function login(): bool
    {
        return Session::client()->isGuest();
    }

    public static function register(): bool
    {
        return Session::client()->isGuest();
    }

    public static function loginToService(): bool
    {
        return Session::client()->isGuest();
    }

    public static function refreshUserMasterToken(): bool
    {
        return Session::client()->isGuest();
    }

}
