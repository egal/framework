<?php

declare(strict_types=1);

namespace Egal\Model\Metadata;

use Egal\Model\Enums\AttributeType;
use Egal\Model\Enums\ValidationRules;
use Egal\Model\Exceptions\ValidateException;
use Egal\Model\Traits\AttributeValidationRules;
use Egal\Validation\Rules\Rule as EgalRule;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Validator;

abstract class AbstractAttributeMetadata
{

    use AttributeValidationRules;

    protected readonly string $name;

    protected readonly AttributeType $type;

    protected mixed $default = null;

    protected bool $nullable = false;

    /**
     * @var array<string, Rule, EgalRule>
     */
    protected array $validationRules = [];

    protected function __construct(string $name, AttributeType $type)
    {
        $this->name = $name;
        $this->type = $type;
    }

    public static function make(string $name, AttributeType $type): static
    {
        return new static($name, $type);
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'type' => $this->type->value,
            'default' => $this->default,
            'nullable' => $this->nullable,
            'validationRules' => $this->validationRules,
        ];
    }

    /**
     * @throws ValidateException
     */
    public function default(mixed $defaultValue): static
    {
        $validator = Validator::make([$this->getName() => $defaultValue], [$this->getName() => $this->getValidationRules()]);

        if ($validator->fails()) {
            if ($validator->fails()) {
                $exception = new ValidateException();
                $exception->setMessageBag($validator->errors());

                throw $exception;
            }
        }

        $this->default = $defaultValue;

        return $this;
    }

    public function nullable(): static
    {
        $this->nullable = true;
        $this->validationRules[] = ValidationRules::NULLABLE->value;

        return $this;
    }

    public function addValidationRule(string $validationRule): static
    {
        $this->validationRules[] = $validationRule;

        return $this;
    }

    public function isNullable(): bool
    {
        return $this->nullable;
    }

    public function getDefault(): mixed
    {
        return $this->default;
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
                array_unshift($this->validationRules, $this->type->value);
                break;
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

}
