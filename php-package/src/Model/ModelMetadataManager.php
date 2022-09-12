<?php

namespace Egal\Model;

use App\Models\Employee;
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

    public function getModelMetadata(string $class): ModelMetadata
    {
        return $this->getInstance()->modelsMetadata[$class] ?? call_user_func(array($class, 'constructMetadata'));
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

            $this->modelsMetadata[$class] = call_user_func(array($class, 'constructMetadata'));
        }
    }

    public function registerModel(string $class): void
    {
        if (empty($this->modelsMetadata[$class])) {
            return;
        }

        $this->modelsMetadata[$class] = call_user_func(array($class, 'constructMetadata'))->toArray();
    }

}
