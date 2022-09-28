<?php

declare(strict_types=1);

namespace Egal\AuthServiceDependencies;

use Egal\Auth\Accesses\StatusAccess;
use Egal\AuthServiceDependencies\Exceptions\IncorrectAppServicesEnvironmentVariablePatternException;
use Egal\Core\Session\Session;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;

class ServiceProvider extends BaseServiceProvider
{


    /**
     * @throws IncorrectAppServicesEnvironmentVariablePatternException
     */
    public function register(): void
    {
        $this->registerServices();
    }

    public function boot(): void
    {
        Gate::define('logged', fn () => Session::getAuthStatus() === StatusAccess::LOGGED);
        Gate::define('guest', fn () => Session::getAuthStatus() === StatusAccess::GUEST);
        Gate::define('service', fn (string $serviceName) =>
            Session::isServiceServiceTokenExists()
            && $serviceName === Session::getServiceServiceToken()->getServiceName()
        );
    }

    /**
     * @throws IncorrectAppServicesEnvironmentVariablePatternException
     */
    protected function registerServices(): void
    {
        $services = [];
        $services[config('app.service_name')] = ['key' => config('app.service_key')];
        $env = env('APP_SERVICES');

        if ($env) {
            foreach (explode(',', $env) as $service) {
                if (!preg_match('/^([\w-]+):(.+)$/', $service, $matches)) {
                    throw IncorrectAppServicesEnvironmentVariablePatternException::make($service);
                }

                $services[$matches[1]] = ['key' => $matches[2]];
            }
        }

        Config::set('app.services', $services);
    }

}
