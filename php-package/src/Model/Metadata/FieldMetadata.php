<?php

namespace Egal\Model\Metadata;

use Egal\Model\Traits\FieldValidationRules;
use Egal\Model\Enums\FieldTypeEnum;

class FieldMetadata
{

    use FieldValidationRules;

    protected string $name;

    protected FieldTypeEnum $type;

    /**
     * @var string[]
     */
    protected array $validationRules = [];

    public static function make(string $name, FieldTypeEnum $type): self
    {
        return new static($name, $type);
    }

    protected function __construct(string $name, FieldTypeEnum $type)
    {
        $this->name = $name;
        $this->type = $type;
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'fieldType' => $this->type->value,
            'validationRules' => $this->validationRules
        ];
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function setType(FieldTypeEnum $type): self
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

    public function getType(): FieldTypeEnum
    {
        return $this->type;
    }

}
