<?php

namespace Egal\Model\Metadata;

use Egal\Model\Enums\AttributeType;

abstract class AbstractAttributeMetadata
{

    protected string $name;

    protected mixed $type;

    public static function make(string $name, mixed $type): self
    {
        return new static($name, $type);
    }

    protected function __construct(string $name, mixed $type)
    {
        $this->name = $name;
        $this->type = $type;
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'type' => $this->type->value,
        ];
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getType(): AttributeType
    {
        return $this->type;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function setType(AttributeType $type): self
    {
        $this->type = $type;

        return $this;
    }

}
