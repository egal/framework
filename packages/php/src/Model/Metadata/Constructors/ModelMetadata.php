<?php

declare(strict_types=1);

namespace Egal\Model\Metadata\Constructors;

use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata as BaseModelMetadata;
use Egal\Model\Metadata\RelationMetadata;

class ModelMetadata extends BaseModelMetadata
{

    public function fields(FieldMetadata ...$fields): self
    {
        $this->fields = $fields;

        return $this;
    }

    public function fakeFields(FieldMetadata ...$fakeFields): self
    {
        $this->fakeFields = $fakeFields;

        return $this;
    }

    public function relations(RelationMetadata ...$relations): self
    {
        $this->relations = $relations;

        return $this;
    }

    public function actions(ActionMetadata ...$actions): self
    {
        $this->actions = $actions;

        return $this;
    }

    /**
     * @param class-string $policy
     */
    public function policy(string $policy): self
    {
        $this->policy = $policy;

        return $this;
    }

    public function dynamic(): self
    {
        $this->dynamic = true;

        return $this;
    }

    public function timestamps(bool $boolean = true): static
    {
        $this->timestamps = $boolean;

        return $this;
    }

}
