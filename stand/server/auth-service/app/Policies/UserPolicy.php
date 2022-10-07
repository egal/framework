<?php

namespace App\Policies;

use Egal\Core\Session\Session;
use Illuminate\Support\Facades\Gate;

class UserPolicy
{
    public function register(Session $session): bool
    {
        return Gate::allows('guest');
    }
}
