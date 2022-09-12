<?php

namespace App\Providers;

use Egal\Model\Facades\ModelMetadataManager as ModelMetadataManagerFacade;
use Illuminate\Support\ServiceProvider as IlluminateServiceProvider;

class AppServiceProvider extends IlluminateServiceProvider
{

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        ModelMetadataManagerFacade::registerDir('/app/app/Models/', 'App\Models\\');
    }

}
