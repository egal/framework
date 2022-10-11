<?php

namespace App\Policies;

use Egal\Core\Session\Session;
use Illuminate\Support\Facades\Gate;

class UserPolicy
{

    public function registering(): bool
    {
        return Gate::allows('guest');
    }

}
