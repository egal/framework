<?php

declare(strict_types=1);

namespace Egal\Model;

use Egal\Core\Exceptions\ModelNotFoundException;
use Egal\Model\Metadata\ModelMetadata;

class ModelMetadataManager
{

    /**
     * @var ModelMetadata[]
     */
    protected array $modelsMetadata = [];

    public function registerDirectory(string $dir, string $modelsNamespace): void
    {
        $dir = base_path() . '/' . $dir;

        foreach (scandir($dir) as $dirItem) {
            $itemPath = str_replace('//', '/', $dir . '/' . $dirItem);

            if ($dirItem === '.' || $dirItem === '..') {
                continue;
            }

            if (is_dir($itemPath)) {
                $itemNamespace = str_replace('/app/', '', $itemPath);
                $itemNamespace = str_replace($itemPath, '', $itemNamespace);
                $itemNamespace = str_replace('/', '\\', $itemNamespace);
                $itemNamespace = ucfirst($itemNamespace);
                $itemPath = str_replace_first(base_path() . '/', '', $itemPath);

                $this->registerDirectory($itemPath, $itemNamespace);
                continue;
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
        $this->addModelMetadata($class::constructMetadata());
    }

    private function addModelMetadata(ModelMetadata $modelMetadata): void
    {
        $modelShortName = $modelMetadata->getModelShortName();
        if (isset($this->modelsMetadata[$modelShortName]) && !$modelMetadata->isDynamic()) {
            throw new \Exception('Already exists!');
        }

        $this->modelsMetadata[$modelShortName] = $modelMetadata;
    }

    /**
     * @throws ModelNotFoundException
     */
    public function getModelMetadata(string $model): ModelMetadata
    {
        if (isset($this->modelsMetadata[$model])) {
            if ($this->modelsMetadata[$model]->isDynamic()) {
                $modelClass = $this->modelsMetadata[$model]->getModelClass();
                $this->addModelMetadata($modelClass::constructMetadata());
            }
            $modelMetadata = $this->modelsMetadata[$model];
        }

        if (class_exists($model)) {
            $modelShortName = get_class_short_name($model);
            if (
                !isset($this->modelsMetadata[$modelShortName])
                || $this->modelsMetadata[$modelShortName]->isDynamic()
            ) {
                $this->addModelMetadata($model::constructMetadata());
            }

            $modelMetadata = $this->modelsMetadata[$modelShortName];
        }

        return $modelMetadata ?? throw ModelNotFoundException::make($model);
    }

}
