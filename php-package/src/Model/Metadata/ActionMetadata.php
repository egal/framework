<?php

declare(strict_types=1);

namespace Egal\Model\Metadata;

use Egal\Model\Enums\FieldType;

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

    protected string $actionName;

    public static function make(string $name): self
    {
        return new static($name);
    }

    protected function __construct(string $name)
    {
        $this->actionName = $name;
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        $actionMetadata = [];
        $actionMetadata['action_name'] = $this->actionName;

        return $actionMetadata;
    }

    public function getActionName(): string
    {
        return $this->actionName;
    }

    public function getActionMethodName(): string
    {
        return self::METHOD_NAME_PREFIX . ucwords($this->actionName);
    }

    public function setActionName(string $actionName): void
    {
        $this->actionName = $actionName;
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
