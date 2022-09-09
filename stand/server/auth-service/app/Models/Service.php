<?php

namespace App\Models;

use App\Metadata\FieldMetadata;
use App\Metadata\FieldTypeEnum;
use App\Metadata\MetadataManager;
use App\Metadata\ModelMetadata;
use Egal\AuthServiceDependencies\Models\Service as BaseService;
use Ramsey\Uuid\Uuid;

/**
 * @action login            {@statuses-access guest}
 * @action loginToService   {@statuses-access guest}
 */
class Service extends BaseService
{
    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', Uuid::class,FieldTypeEnum::KEY));
    }

    public static function getMetadata(): array
    {
        return MetadataManager::getModelMetadata(static::class)->toArray();
    }

}
