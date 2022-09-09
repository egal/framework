<?php

namespace Egal\Model\Facades;

use Egal\Model\Metadata\ModelMetadata;
use Illuminate\Support\Facades\Facade;

/**
 * @method static \Egal\Model\ModelMetadataManager getInstance()
 * @method static ModelMetadata getModelMetadata(string $class)
 */
class ModelMetadataManager extends Facade
{

    protected static function getFacadeAccessor(): string
    {
        return 'modelMetadataManager';
    }

}
