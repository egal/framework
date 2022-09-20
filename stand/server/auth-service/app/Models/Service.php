<?php

namespace App\Models;

use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\AuthServiceDependencies\Models\Service as BaseService;

class Service extends BaseService
{

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(Service::class)
            ->addActions([
                ActionMetadata::make('login'),
                ActionMetadata::make('loginToService'),
                ActionMetadata::make('getMetadata'),
            ]);
    }

}
