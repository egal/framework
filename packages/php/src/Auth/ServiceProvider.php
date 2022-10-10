<?php

declare(strict_types=1);

namespace Egal\Auth;

use Egal\Auth\Accesses\StatusAccess;
use Egal\Core\Session\Session;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{

    public function boot(): void
    {
        Gate::define('logged', fn () => Session::getAuthStatus() === StatusAccess::LOGGED);
        Gate::define('guest', fn () => Session::getAuthStatus() === StatusAccess::GUEST);
        Gate::define('service', fn (string $serviceName) =>
            Session::isServiceServiceTokenExists()
            && $serviceName === Session::getServiceServiceToken()->getServiceName()
        );
    }

}
