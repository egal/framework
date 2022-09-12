<?php

namespace App\Models;

use Egal\Model\Metadata\ModelMetadata;
use Egal\AuthServiceDependencies\Models\Service as BaseService;

class Service extends BaseService
{

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class)
            ->addActions(['login', 'loginToService']);
    }

}
