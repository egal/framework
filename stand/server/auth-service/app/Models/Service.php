<?php

namespace App\Models;

use App\Policies\ServicePolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\AuthServiceDependencies\Models\Service as BaseService;

class Service extends BaseService
{

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(Service::class)
            ->policy(ServicePolicy::class)
            ->addActions([
                ActionMetadata::make('login')
                    ->addParameters([
                        ActionParameterMetadata::make('service_name', VariableType::STRING)
                            ->required(),
                        ActionParameterMetadata::make('key', VariableType::STRING)
                            ->required(),
                    ]),
                ActionMetadata::make('loginToService')
                    ->addParameters([
                        ActionParameterMetadata::make('token', VariableType::STRING)
                            ->required(),
                        ActionParameterMetadata::make('service_name', VariableType::STRING)
                            ->required()
                    ]),
            ]);
    }

}
