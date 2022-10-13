<?php

namespace App\Policies;

use Egal\Core\Session\Session;
use Illuminate\Support\Facades\Gate;

class SchoolPolicy
{

    public static function actionCreate(): bool
    {
        return true;
    }

}
