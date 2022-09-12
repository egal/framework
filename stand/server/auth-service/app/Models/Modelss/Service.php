<?php

namespace App\Models\Modelss;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
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

}
