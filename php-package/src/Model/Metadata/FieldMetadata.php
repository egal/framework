<?php

declare(strict_types=1);

namespace Egal\Model\Metadata;

use Egal\Model\Enums\FieldType;
use Egal\Model\Traits\FieldValidationRules;

class FieldMetadata
{

    use FieldValidationRules;

    protected string $name;

    protected FieldType $type;

    /**
     * @var string[]
     */
    protected array $validationRules = [];

    protected function __construct(string $name, FieldType $type)
    {
        $this->name = $name;
        $this->type = $type;
    }

    public static function make(string $name, FieldType $type): self
    {
        return new static($name, $type);
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'type' => $this->type->value,
            'validationRules' => $this->validationRules,
        ];
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function setType(FieldType $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function addValidationRule(string $validationRule): self
    {
        $this->validationRules[] = $validationRule;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getType(): FieldType
    {
        return $this->type;
    }

    public function getValidationRules(): array
    {
        return $this->validationRules;
    }

}
