<?php

namespace Egal\Model\Metadata;

use Egal\Model\Traits\FieldValidationRules;
use Egal\Model\Enums\FieldType;

class FieldMetadata
{

    use FieldValidationRules;

    protected readonly string $name;

    protected readonly FieldType $type;

    protected bool $hidden = false;

    protected bool $guarded = false;



    /**
     * @var string[]
     */
    protected array $validationRules = [];

    public static function make(string $name, FieldType $type): self
    {
        return new static($name, $type);
    }

    protected function __construct(string $name, FieldType $type)
    {
        $this->name = $name;
        $this->type = $type;
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'type' => $this->type->value,
            'hidden' => $this->hidden,
            'guarded' => $this->guarded,
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
        if (in_array($this->type->value, $this->validationRules)) {
            return $this->validationRules;
        }

        switch ($this->type) {
            case FieldType::DATETIME:
                break;
            default:
                array_unshift($this->validationRules, $this->type->value);
        }

        return $this->validationRules;
    }

    public function hidden(): self
    {
        $this->hidden = true;

        return $this;
    }

    public function guarded(): self
    {
        $this->guarded = true;

        return $this;
    }

    public function fillable(): self
    {
        $this->fillable = true;

        return $this;
    }

    public function isHidden(): bool
    {
        return $this->hidden;
    }

    public function isGuarded(): bool
    {
        return $this->guarded;
    }

    public function isFillable(): bool
    {
        return $this->fillable;
    }

}
