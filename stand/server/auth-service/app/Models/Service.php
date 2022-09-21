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
                ActionMetadata::make('create'),
                ActionMetadata::make('update'),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('delete'),
                ActionMetadata::make('getItem'),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
