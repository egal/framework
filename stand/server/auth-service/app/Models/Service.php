<?php

namespace App\Models;

use App\Metadata\FieldMetadata;
use App\Metadata\FieldTypeEnum;
use App\Metadata\ModelMetadataManager;
use App\Metadata\ModelMetadata;
use Egal\AuthServiceDependencies\Models\Service as BaseService;

/**
 * @action login            {@statuses-access guest}
 * @action loginToService   {@statuses-access guest}
 */
class Service extends BaseService
{
    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldTypeEnum::UUID));
    }

    public static function getMetadata(): array
    {
        return ModelMetadataManager::getModelMetadata(static::class)->toArray();
    }

}
