<?php

declare(strict_types=1);

namespace Egal\Model\Metadata;

/**
 * @package Egal\Model
 */
class ActionMetadata
{

    // TODO: добавить метаданные доступов
    // TODO: добавить генерацию входных параметров
    // TODO: добавить обработку дефолтных значений параметров
    // TODO: добавить правила валидации для action
    // TODO: добавить примеры запроса-ответа
    public const METHOD_NAME_PREFIX = 'action';

    protected string $name;

    protected function __construct(string $name)
    {
        $this->name = $name;
    }

    public static function make(string $name): self
    {
        return new static($name);
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        $actionMetadata = [];
        $actionMetadata['action_name'] = $this->name;

        return $actionMetadata;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getMethodName(): string
    {
        return self::METHOD_NAME_PREFIX . ucwords($this->name);
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * Получение корректного названия метода у модели.
     *
     * @return string
     *
     * TODO: Убрать ответственность с других классов от определения метода по названию
     */
    public static function getCurrentActionName(string $actionName): string
    {
        return str_contains($actionName, self::METHOD_NAME_PREFIX)
            ? $actionName
            : self::METHOD_NAME_PREFIX . ucwords($actionName);
    }

}
