<?php

declare(strict_types=1);

namespace Egal\Policy;

class PolicyManager
{
    public const POLICY_CLASS_NAME_SUFFIX = 'Policy';

    /**
     * All the defined policies.
     *
     * @var array
     */
    protected array $policies = [];

    public function __construct() { }

    public function registerPolicy(string $model, array $policies): void
    {
        $this->policies = array_merge($this->policies, ['$model' => $policies]);
    }

    public function registerDirectory(string $dir, string $policiesNamespace): void
    {
        $dir = base_path() . '/' . $dir;
        dump($dir);
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
            $class = $policiesNamespace . $class;

            $policyClass = class_exists($classShortName)
            $this->registerPolicy($class, );
        }
    }

    /**
     * @throws ModelNotFoundException
     */
    public function getModelMetadata(string $class): ModelMetadata
    {
        if (class_exists($class)) {
            return $this->modelsMetadata[get_class_short_name($class)] ?? call_user_func([$class, 'constructMetadata']);
        }

        if (isset($this->modelsMetadata[$class])) {
            return $this->modelsMetadata[$class];
        }

        throw ModelNotFoundException::make($class);
    }

    public function getModelsMetadata(): array
    {
        return $this->modelsMetadata;
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

        if (! empty($this->modelsMetadata[$classShortName])) {
            return;
        }

        $model = new $class();

        if (! ($model instanceof Model || $model instanceof Service)) {
            throw new Exception();
        }

        $this->modelsMetadata[$classShortName] = $model->constructMetadata();
    }
}
