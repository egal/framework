<?php

namespace App\Policies;

use Egal\Core\Session\Session;
use Illuminate\Support\Facades\Gate;

class ModelPolicy
{

    public static function actionDelete(): bool
    {
        return false;
    }

    public static function registering(): bool
    {
        return Session::getAuthEntity()->isGuestOrFail();
    }

}
