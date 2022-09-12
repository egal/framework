<?php

namespace Egal\Model\Metadata;

use Closure;
use Egal\Model\Enums\RelationTypeEnum;

class RelationMetadata
{

    protected string $name;

    protected RelationTypeEnum $type;

    protected Closure $closure;

    public static function make(string $name, RelationTypeEnum $type, Closure $closure): self
    {
        return new static($name, $type, $closure);
    }

    protected function __construct(string $name, RelationTypeEnum $type, Closure $closure)
    {
        $this->name = $name;
        $this->type = $type;
        $this->closure = $closure;
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'type' => $this->type->value
        ];
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function setType(RelationTypeEnum $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function setClosure(Closure $closure): self
    {
        $this->closure = $closure;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getType(): RelationTypeEnum
    {
        return $this->type;
    }

    public function getClosure(): Closure
    {
        return $this->closure;
    }

}
