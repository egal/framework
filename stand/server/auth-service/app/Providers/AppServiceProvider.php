<?php

namespace App\Providers;

use App\Models\User;
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
//        ModelMetadataManagerFacade::registerDirectory('/app/app/Models/', 'App\Models\\');
        ModelMetadataManagerFacade::registerModel(User::class);
    }

}
