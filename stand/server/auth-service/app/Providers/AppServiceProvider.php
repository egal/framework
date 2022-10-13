<?php

namespace App\Providers;

use Egal\Model\Facades\ModelMetadataManager;
use Illuminate\Support\ServiceProvider as IlluminateServiceProvider;

class AppServiceProvider extends IlluminateServiceProvider
{

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ModelMetadataManager::registerDirectory('app/Models/', 'App\Models\\');
    }

}
