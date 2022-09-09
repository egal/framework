<?php

namespace App\Metadata;

use Egal\Core\Exceptions\ModelNotFoundException;

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
    public static function getModelMetadata(string $class): ModelMetadata
    {
        return self::getInstance()->modelsMetadata[$class] ?? call_user_func(array($class, 'constructMetadata'))->toArray();
    }

    public static function loadModel(): void
    {
        $instance = static::getInstance();

        if (empty($instance->modelsMetadata)) {
            $instance->scanModels();
        }
    }

    protected function scanModels(?string $dir = null): void
    {
        $baseDir = base_path('app/Models/');

        $dir = $dir ?? $baseDir;

        $modelsNamespace = 'App\Models\\';

        foreach (scandir($dir) as $dirItem) {
            $itemPath = str_replace('//', '/', $dir . '/' . $dirItem);

            if ($dirItem === '.' || $dirItem === '..') {
                continue;
            }

            if (is_dir($itemPath)) {
                $this->scanModels($itemPath);
            }

            if (!str_contains($dirItem, '.php')) {
                continue;
            }

            $classShortName = str_replace('.php', '', $dirItem);
            $class = str_replace($baseDir, '', $itemPath);
            $class = str_replace($dirItem, $classShortName, $class);
            $class = str_replace('/', '\\', $class);
            $class = $modelsNamespace . $class;
            $this->modelsMetadata[$class] = call_user_func(array($class, 'constructMetadata'));
        }
    }
}
