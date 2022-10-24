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
        $this->addModelMetadata($class::constructMetadata());
    }

    private function addModelMetadata(ModelMetadata $modelMetadata, bool $reset = false): void
    {
        $modelShortName = $modelMetadata->getModelShortName();

        if (isset($this->modelsMetadata[$modelShortName]) && $reset) {
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
            ! $this->modelsMetadata[$model]->dynamic() ?: $this->registerModel($this->modelsMetadata[$model]->getModelShortName());
            $modelMetadata = $this->modelsMetadata[$model];
        }
        if (class_exists($model)) {
            $this->modelsMetadata[get_class_short_name($model)] ?? $this->registerModel($model);
            $modelMetadata = $this->modelsMetadata[get_class_short_name($model)];
        }

        return $modelMetadata ?? throw ModelNotFoundException::make($model);
    }

}
