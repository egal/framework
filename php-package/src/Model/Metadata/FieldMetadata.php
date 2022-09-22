<?php

namespace Egal\Model\Metadata;

use Egal\Model\Traits\AttributeValidationRules;

class FieldMetadata extends AbstractValidatedAttributeMetadata
{

    protected bool $hidden = false;

    protected bool $guarded = false;

    protected bool $fillable = false;

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'type' => $this->type->value,
            'validationRules' => $this->validationRules,
            'hidden' => $this->hidden,
            'guarded' => $this->guarded,
            'fillable' => $this->fillable,
        ];
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
