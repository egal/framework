<?php

namespace App\Metadata;

trait FieldValidationRules
{

    public function string(): void
    {
        $this->validationRules[] = ValidationRulesEnum::STRING;
    }

}
