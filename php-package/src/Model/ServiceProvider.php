<?php

namespace Egal\Model;

use Illuminate\Support\ServiceProvider as IlluminateServiceProvider;

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

    /**
     * @throws \Egal\Model\Exceptions\LoadModelImpossiblyException
     * @throws \ReflectionException
     */
    public function register(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([]);
        }

        $this->app->singleton('modelMetadataManager', function (): ModelMetadataManager {
            return new ModelMetadataManager();
        });

        ModelMetadataManager::loadModel();

        $this->commands([]);
    }

}
