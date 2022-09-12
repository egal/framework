<?php

namespace Egal\Model\Traits;

use Egal\Model\Enums\ValidationRulesEnum;

trait FieldValidationRules
{

    public function required(): self
    {
        $this->validationRules[] = ValidationRulesEnum::REQUIRED->value;

        return $this;
    }

    public function sometimes(): self
    {
        $this->validationRules[] = ValidationRulesEnum::SOMETIMES->value;

        return $this;
    }

    public function nullable(): self
    {
        $this->validationRules[] = ValidationRulesEnum::NULLABLE->value;

        return $this;
    }

    public function string(): self
    {
        $this->validationRules[] = ValidationRulesEnum::STRING->value;

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

    public function accepted(): self
    {
        $this->validationRules[] = ValidationRulesEnum::ACCEPTED->value;

        return $this;
    }

    public function activeUrl(): self
    {
        $this->validationRules[] = ValidationRulesEnum::ACTIVE_URL->value;

        return $this;
    }

    public function alpha(): self
    {
        $this->validationRules[] = ValidationRulesEnum::ALPHA->value;

        return $this;
    }

    public function alphaDash(): self
    {
        $this->validationRules[] = ValidationRulesEnum::ALPHA_DASH->value;

        return $this;
    }

    public function alphaNum(): self
    {
        $this->validationRules[] = ValidationRulesEnum::ALPHA_NUM->value;

        return $this;
    }

    public function array(): self
    {
        $this->validationRules[] = ValidationRulesEnum::ARRAY->value;

        return $this;
    }

    public function bail(): self
    {
        $this->validationRules[] = ValidationRulesEnum::BAIL->value;

        return $this;
    }

    public function confirmed(): self
    {
        $this->validationRules[] = ValidationRulesEnum::CONFIRMED->value;

        return $this;
    }

    public function date(): self
    {
        $this->validationRules[] = ValidationRulesEnum::DATE->value;

        return $this;
    }

    public function declined(): self
    {
        $this->validationRules[] = ValidationRulesEnum::DECLINED->value;

        return $this;
    }

    public function exclude(): self
    {
        $this->validationRules[] = ValidationRulesEnum::EXCLUDE->value;

        return $this;
    }

    public function file(): self
    {
        $this->validationRules[] = ValidationRulesEnum::FILE->value;

        return $this;
    }

    public function filled(): self
    {
        $this->validationRules[] = ValidationRulesEnum::FILLED->value;

        return $this;
    }

    public function image(): self
    {
        $this->validationRules[] = ValidationRulesEnum::IMAGE->value;

        return $this;
    }

    public function integer(): self
    {
        $this->validationRules[] = ValidationRulesEnum::INTEGER->value;

        return $this;
    }

    public function ip(): self
    {
        $this->validationRules[] = ValidationRulesEnum::IP->value;

        return $this;
    }

    public function ipv4(): self
    {
        $this->validationRules[] = ValidationRulesEnum::IPV4->value;

        return $this;
    }

    public function ipv6(): self
    {
        $this->validationRules[] = ValidationRulesEnum::IPV6->value;

        return $this;
    }

}
