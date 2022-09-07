<?php

namespace App\Metadata;

use App\Exceptions\TypeNotAllowedAsFieldTypeException;

class FieldMetadata
{

    use FieldValidationRules;

    protected string $name;

    protected string $type;

    /**
     * @var string[]
     */
    protected array $validationRules = [];

    /**
     * @param string $name
     * @param string $type
     * @return FieldMetadata
     * @throws TypeNotAllowedAsFieldTypeException
     */
    public static function make(string $name, string $type): self
    {
        if (! in_array($type, FieldTypeEnum::getValuesInLowerCase())) {
            throw TypeNotAllowedAsFieldTypeException::make($type);
        }

        return new static($name, $type);
    }

    protected function __construct(string $name, string $type)
    {
        $this->name = $name;
        $this->type = $type;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }
}
