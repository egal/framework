<?php

namespace App\Policies;

use Egal\Core\Session\Session;

class ServicePolicy
{

    public static function actionLogin(): bool
    {
        return Session::getAuthEntity()->isGuest();
    }

    public static function actionLoginToService(): bool
    {
        return Session::getAuthEntity()->isGuest();
    }

}
