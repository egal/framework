<?php

declare(strict_types=1);

namespace Egal\Model\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void registerDirectory(string $dir, string $modelsNamespace)
 * @method static void registerModel(string $class)
 * @method static Egal\Model\Metadata\ModelMetadata getModelMetadata(string $class)
 */
class ModelMetadataManager extends Facade
{

    protected static function getFacadeAccessor(): string
    {
        return 'ModelMetadataManager';
    }

}
