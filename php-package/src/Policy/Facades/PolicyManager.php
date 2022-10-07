<?php

declare(strict_types=1);

namespace Egal\Policy\Facades;

use Egal\Model\Metadata\ModelMetadata;
use Illuminate\Support\Facades\Facade;

/**
 * @method static void registerDirectory(string $model, array $policies)
 * @method static void registerPolicy(string $model, array $policies)
 * @method static ModelMetadata getModelMetadata(string $class)
 */
class PolicyManager extends Facade
{

    protected static function getFacadeAccessor(): string
    {
        return 'PolicyManager';
    }

}
