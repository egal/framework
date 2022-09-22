<?php

namespace Egal\Model\Metadata;

use Egal\Model\Enums\AttributeType;
use Egal\Model\Traits\AttributeValidationRules;

abstract class AbstractValidatedAttributeMetadata
{

    use AttributeValidationRules;

    protected string $name;

    protected AttributeType $type;

    /**
     * @var string[]
     */
    protected array $validationRules = [];

    public static function make(string $name, AttributeType $type): static
    {
        return new static($name, $type);
    }

    protected function __construct(string $name, AttributeType $type)
    {
        $this->name = $name;
        $this->type = $type;
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'type' => $this->type->value,
            'validationRules' => $this->validationRules,
        ];
    }

    public function addValidationRule(string $validationRule): self
    {
        $this->validationRules[] = $validationRule;

        return $this;
    }

    public function getValidationRules(): array
    {
        if (in_array($this->type->value, $this->validationRules)) {
            return $this->validationRules;
        }

        switch ($this->type) {
            case AttributeType::DATETIME:
                break;
            default:
                $this->validationRules[] = $this->type->value;
        }

        return $this->validationRules;
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
