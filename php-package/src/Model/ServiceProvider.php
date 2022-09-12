<?php

namespace Egal\Model;

use Illuminate\Support\ServiceProvider as IlluminateServiceProvider;
use \Egal\Model\Facades\ModelMetadataManager as ModelMetadataManagerFacade;

/**
 * @package Egal\Model
 */
class ServiceProvider extends IlluminateServiceProvider
{

    /**
     * Указывает, отложена ли загрузка провайдера.
     *
     * @noinspection PhpUnusedPropertyInspection
     * @var bool
     */
    protected bool $defer = true;

    /**
     * Команды для регистрации.
     *
     * @var array
     */
    protected array $commands = [];

    public function register(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([]);
        }

        $this->app->singleton('modelMetadataManager', function (): ModelMetadataManager {
            return new ModelMetadataManager();
        });

        ModelMetadataManagerFacade::registerDir('/app/app/Models/', 'App\Models\\');

        $this->commands([]);
    }

}
