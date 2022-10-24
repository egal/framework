<?php

declare(strict_types=1);

namespace Egal\Model;

use Egal\AuthServiceDependencies\Models\Service;
use Egal\Core\Exceptions\ModelNotFoundException;
use Egal\Model\Metadata\ModelMetadata;
use Mockery\Exception;

class ModelMetadataManager
{

    /**
     * @var ModelMetadata[]
     */
    protected array $modelsMetadata = [];

    public function __construct()
    {
    }

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

                $this->registerDirectory($itemPath, $itemNamespace);
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

        if (
            !empty($this->modelsMetadata[$classShortName])
            && (!$this->modelsMetadata[$classShortName]->isDynamic())
        ) {
            return;
        }

        $this->addModelMetadata($this->parseModelMetadata($class));
    }

    private function addModelMetadata(ModelMetadata $modelMetadata, bool $reset = false): void
    {
        if (isset($this->modelsMetadata[$modelMetadata->getModelShortName()]) && !$reset) {
            throw new \Exception('Already exists!');
        }

        $this->modelsMetadata[$modelMetadata->getModelShortName()] = $modelMetadata;
    }

    private function parseModelMetadata(string $class): ModelMetadata
    {
        $model = new $class();

        if (!($model instanceof Model || $model instanceof Service)) {
            throw new Exception();
        }

        return $model->constructMetadata();
    }

    public function getModelsMetadata(): array
    {
        return $this->modelsMetadata;
    }

    private function modelMetadataExists(string $name): bool
    {
        return isset($this->modelsMetadata[$name]);
    }

    private function getName(string $model): string
    {
        return class_exists($model) ? get_class_short_name($model) : $model;
    }

    /**
     * @throws ModelNotFoundException
     */
    public function getModelMetadata(string $model): ModelMetadata
    {
        $name = $this->getName($model);

        if (!(class_exists($model) || $this->modelMetadataExists($name))) {
            throw ModelNotFoundException::make($model);
        }

        $modelMetadata = $this->modelsMetadata[$name];

        if ($modelMetadata->isDynamic()) {
            $this->addModelMetadata($modelMetadata, true);
        }

        return $modelMetadata;
    }

}
