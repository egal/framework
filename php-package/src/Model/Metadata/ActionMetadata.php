<?php

declare(strict_types=1);

namespace Egal\Model\Metadata;

use Egal\Model\Exceptions\ActionParameterNotFoundException;

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

    /**
     * @var ActionParameterMetadata[]
     */
    protected array $parameters = [];

    protected string $name;

    protected function __construct(string $name)
    {
        $this->name = $name;
    }

    public static function make(string $name): self
    {
        return new static($name);
    }

    public function getParameters(): array
    {
        return $this->parameters;
    }

    public function parameterExist(string $parameterName): bool
    {
        foreach ($this->parameters as $parameter) {
            if ($parameter->getName() === $parameterName) {
                return true;
            }
        }

        return false;
    }

    /**
     * @throws ActionParameterNotFoundException
     */
    public function fieldExistOrFail(string $parameterName): bool
    {
        if (!$this->parameterExist($parameterName)) {
            throw ActionParameterNotFoundException::make($parameterName);
        }

        return true;
    }

    /**
     * @param ActionParameterMetadata[] $parameters
     */
    public function addParameters(array $parameters): self
    {
        $this->parameters = array_merge($this->parameters, $parameters);

        return $this;
    }

    /**
     * @return array
     */
    public function toArray(): array
    {
        $actionMetadata = [];
        $actionMetadata['parameters'] = array_map(fn($parameter) => $parameter->toArray(), $this->parameters);
        $actionMetadata['name'] = $this->name;

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

}
