<?php

namespace App\Facades;

use App\Metadata\ModelMetadata;
use Illuminate\Support\Facades\Facade;

/**
 * @method static \App\Metadata\ModelMetadataManager getInstance()
 * @method static ModelMetadata getModelMetadata(string $class)
 */
class ModelMetadataManager extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'modelMetadataManager';
    }
}
