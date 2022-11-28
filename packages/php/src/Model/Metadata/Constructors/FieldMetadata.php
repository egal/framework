<?php

declare(strict_types=1);

namespace Egal\Model\Metadata\Constructors;

use Egal\Model\Metadata\FieldMetadata as BaseFieldMetadata;

class FieldMetadata extends BaseFieldMetadata
{

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

    public function required(): self
    {
        $this->required = true;
        $this->requiredVariableMetadata();

        return $this;
    }

}
