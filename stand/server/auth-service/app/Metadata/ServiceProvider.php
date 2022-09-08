<?php

namespace App\Metadata;

use Illuminate\Support\ServiceProvider as IlluminateServiceProvider;

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

        $this->app->singleton(MetadataManager::class, function (): MetadataManager {
            return new MetadataManager();
        });

        MetadataManager::loadModel(MetadataManager::class);

        $this->commands([]);
    }

}
