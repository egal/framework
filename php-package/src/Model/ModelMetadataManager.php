<?php

namespace Egal\Model;

use Egal\Core\Exceptions\ModelNotFoundException;
use Egal\Model\Metadata\ModelMetadata;

class ModelMetadataManager
{

    /**
     * @var ModelMetadata[]
     */
    protected array $modelsMetadata = [];

    public function __construct() { }

    public function getInstance(): ModelMetadataManager
    {
        return app(self::class);
    }

    /**
     * @throws ModelNotFoundException
     */
    public function getModelMetadata(string $class): ModelMetadata
    {
        if (class_exists($class)) {
            return $this->getInstance()->modelsMetadata[get_class_short_name($class)] ?? call_user_func(array($class, 'constructMetadata'));
        }

        if (isset(self::getInstance()->modelsMetadata[$class])) {
            return self::getInstance()->modelsMetadata[$class];
        }

        throw ModelNotFoundException::make($class);
    }

    public function getModelsMetadata(): array
    {
        return $this->modelsMetadata;
    }

    public function registerDir(string $dir, string $modelsNamespace): void
    {
        foreach (scandir($dir) as $dirItem) {
            $itemPath = str_replace('//', '/', $dir . '/' . $dirItem);
            if ($dirItem === '.' || $dirItem === '..') {
                continue;
            }

            if (is_dir($itemPath)) {
                $itemNamespace = str_replace('/app/', '', $itemPath);
                $itemNamespace = str_replace($itemPath, '', $itemNamespace);
                $itemNamespace =  str_replace('/', '\\', $itemNamespace);
                $itemNamespace = ucfirst($itemNamespace);

                $this->registerDir($itemPath, $itemNamespace);
            }

            if (!str_contains($dirItem, '.php')) {
                continue;
            }

            $classShortName = str_replace('.php', '', $dirItem);
            $class = str_replace($dir, '', $itemPath);
            $class = str_replace($dirItem, $classShortName, $class);
            $class = str_replace('/', '\\', $class);
            $class = $modelsNamespace . $class;

            $this->registerModel($class);
        }
    }

    public function registerModel(string $class): void
    {
        $classShortName = get_class_short_name($class);

        if (empty($this->modelsMetadata[$classShortName])) {
            return;
        }

        $this->modelsMetadata[$classShortName] = call_user_func(array($class, 'constructMetadata'))->toArray();
    }

}
