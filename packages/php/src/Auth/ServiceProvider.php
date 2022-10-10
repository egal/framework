<?php

declare(strict_types=1);

namespace Egal\Auth;

use Egal\Auth\Entities\Guest;
use Egal\Auth\Entities\Service;
use Egal\Auth\Entities\User;
use Egal\Core\Session\Session;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{

    public function boot(): void
    {
        Gate::define('user', fn () => Session::getAuthEntity() instanceof User);
        Gate::define('guest', fn () => Session::getAuthEntity() instanceof Guest);
        Gate::define('service', fn () => Session::getAuthEntity() instanceof Service);
    }

}
