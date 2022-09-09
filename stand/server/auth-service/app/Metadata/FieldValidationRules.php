<?php

namespace App\Metadata;

trait FieldValidationRules
{

    public function required(): self
    {
        $this->validationRules[] = ValidationRulesEnum::REQUIRED->value;

        return $this;
    }

    public function string(): self
    {
        $this->validationRules[] = ValidationRulesEnum::STRING->value;

        return $this;
    }

    public function int(): self
    {
        $this->validationRules[] = ValidationRulesEnum::INT->value;

        return $this;
    }

    public function boolean(): self
    {
        $this->validationRules[] = ValidationRulesEnum::BOOLEAN->value;

        return $this;
    }

    public function float(): self
    {
        $this->validationRules[] = ValidationRulesEnum::FLOAT->value;

        return $this;
    }

    public function sometimes(): self
    {
        $this->validationRules[] = ValidationRulesEnum::SOMETIMES->value;

        return $this;
    }

}
