<?php

namespace Egal\Model\Metadata;

class FieldMetadata extends AbstractAttributeMetadata
{

    protected bool $hidden = false;

    protected bool $guarded = false;

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'type' => $this->type->value,
            'hidden' => $this->hidden,
            'guarded' => $this->guarded,
            'default' => $this->default,
            'nullable' => $this->nullable,
            'validationRules' => $this->validationRules,
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

    public function isHidden(): bool
    {
        return $this->hidden;
    }

    public function isGuarded(): bool
    {
        return $this->guarded;
    }

}
