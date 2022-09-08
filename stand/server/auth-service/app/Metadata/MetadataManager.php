<?php

namespace App\Metadata;

use Egal\Core\Exceptions\ModelNotFoundException;
use Egal\Model\Exceptions\LoadModelImpossiblyException;
use Egal\Model\Metadata\ModelMetadata;

class MetadataManager
{
    /**
     * @var ModelMetadata[]
     */
    protected array $modelsMetadata = [];

    public function __construct()
    {
        $this->scanModels();
    }

    public static function getInstance(): MetadataManager
    {
        return app(self::class);
    }

    /**
     * @throws ModelNotFoundException
     */
    public static function getModelMetadata(string $model): ModelMetadata
    {
        if (class_exists($model)) {
            throw ModelNotFoundException::make($model);
        }

        return self::getInstance()->modelsMetadata[$model] ?? call_user_func(array($model, 'getModelMetadata'));
    }

    public static function loadModel(string $class): void
    {
        $instance = static::getInstance();
        $classShortName = get_class_short_name($class);

        if (isset($instance->modelsMetadata[$classShortName])) {
            throw new LoadModelImpossiblyException();
        }

        $instance->modelsMetadata[$classShortName] = new ModelMetadata($class);
    }
}
