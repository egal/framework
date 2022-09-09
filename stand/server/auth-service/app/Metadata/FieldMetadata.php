<?php

namespace App\Metadata;

class FieldMetadata
{

    use FieldValidationRules;

    protected string $name;

    protected string $dataType;

    protected FieldTypeEnum $fieldType;

    /**
     * @var string[]
     */
    protected array $validationRules = [];

    public static function make(string $name, string $dataType, FieldTypeEnum $fieldType): self
    {
        return new static($name, $dataType, $fieldType);
    }

    protected function __construct(string $name, string $dataType, FieldTypeEnum $fieldType)
    {
        $this->name = $name;
        $this->fieldType = $fieldType;
        $this->dataType = $dataType;
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'fieldType' => $this->fieldType->value,
            'dataType' => $this->dataType,
            'validationRules' => $this->validationRules
        ];
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function setFieldType(FieldTypeEnum $fieldType): self
    {
        $this->fieldType = $fieldType;

        return $this;
    }

    public function setDataType(string $dataType): self
    {
        $this->dataType = $dataType;

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

    public function getDataType(): string
    {
        return $this->dataType;
    }

    public function getFiledType(): FieldTypeEnum
    {
        return $this->fieldType;
    }

}
