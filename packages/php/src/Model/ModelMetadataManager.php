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

    public function __construct() { }

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

    public function registerModel(string $class, bool $dynamic = false): void
    {
        $classShortName = get_class_short_name($class);

        if (! empty($this->modelsMetadata[$classShortName]) && (! $dynamic)) {
            return;
        }

        $this->parseModelMetadata($class);
    }

    private function parseModelMetadata(string $class): ModelMetadata
    {
        $model = new $class();
        $classShortName = get_class_short_name($class);

        if (! ($model instanceof Model || $model instanceof Service)) {
            throw new Exception();
        }

        $this->modelsMetadata[$classShortName] = $model->constructMetadata();

        return $this->modelsMetadata[$classShortName];
    }

    public function getModelsMetadata(): array
    {
        return $this->modelsMetadata;
    }

    /**
     * @throws ModelNotFoundException
     */
    public function getModelMetadata(string $class, bool $dynamic = false): ModelMetadata
    {
        if (class_exists($class)) {
            return $this->modelsMetadata[get_class_short_name($class)] ?? $this->parseModelMetadata($class);
        }

        if (isset($this->modelsMetadata[$class])) {
            return $dynamic ? $this->parseModelMetadata($this->modelsMetadata[$class]->getModelClass()) : $this->modelsMetadata[$class];
        }

        throw ModelNotFoundException::make($class);
    }

}
