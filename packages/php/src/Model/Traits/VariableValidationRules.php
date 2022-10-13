<?php

declare(strict_types=1);

namespace Egal\Model\Traits;

use Egal\Model\Enums\ValidationRules;
use Illuminate\Validation\Rule;

trait VariableValidationRules
{

    public function array_keys(array $keys): static
    {
        $keys = implode(',', $keys);
        $this->validationRules[] = 'array:' . $keys;

        return $this;
    }

    public function required(): static
    {
        $this->validationRules[] = ValidationRules::REQUIRED->value;

        return $this;
    }

    public function sometimes(): static
    {
        $this->validationRules[] = ValidationRules::SOMETIMES->value;

        return $this;
    }

    public function string(): static
    {
        $this->validationRules[] = ValidationRules::STRING->value;

        return $this;
    }

    public function boolean(): static
    {
        $this->validationRules[] = ValidationRules::BOOLEAN->value;

        return $this;
    }

    public function numeric(): static
    {
        $this->validationRules[] = ValidationRules::NUMERIC->value;

        return $this;
    }

    public function accepted(): static
    {
        $this->validationRules[] = ValidationRules::ACCEPTED->value;

        return $this;
    }

    public function activeUrl(): static
    {
        $this->validationRules[] = ValidationRules::ACTIVE_URL->value;

        return $this;
    }

    public function alpha(): static
    {
        $this->validationRules[] = ValidationRules::ALPHA->value;

        return $this;
    }

    public function alphaDash(): static
    {
        $this->validationRules[] = ValidationRules::ALPHA_DASH->value;

        return $this;
    }

    public function alphaNum(): static
    {
        $this->validationRules[] = ValidationRules::ALPHA_NUM->value;

        return $this;
    }

    public function array(): static
    {
        $this->validationRules[] = ValidationRules::ARRAY->value;

        return $this;
    }

    public function bail(): static
    {
        $this->validationRules[] = ValidationRules::BAIL->value;

        return $this;
    }

    public function confirmed(): static
    {
        $this->validationRules[] = ValidationRules::CONFIRMED->value;

        return $this;
    }

    public function date(): static
    {
        $this->validationRules[] = ValidationRules::DATE->value;

        return $this;
    }

    public function declined(): static
    {
        $this->validationRules[] = ValidationRules::DECLINED->value;

        return $this;
    }

    public function exclude(): static
    {
        $this->validationRules[] = ValidationRules::EXCLUDE->value;

        return $this;
    }

    public function file(): static
    {
        $this->validationRules[] = ValidationRules::FILE->value;

        return $this;
    }

    public function filled(): static
    {
        $this->validationRules[] = ValidationRules::FILLED->value;

        return $this;
    }

    public function image(): static
    {
        $this->validationRules[] = ValidationRules::IMAGE->value;

        return $this;
    }

    public function integer(): static
    {
        $this->validationRules[] = ValidationRules::INTEGER->value;

        return $this;
    }

    public function ip(): static
    {
        $this->validationRules[] = ValidationRules::IP->value;

        return $this;
    }

    public function ipv4(): static
    {
        $this->validationRules[] = ValidationRules::IPV4->value;

        return $this;
    }

    public function ipv6(): static
    {
        $this->validationRules[] = ValidationRules::IPV6->value;

        return $this;
    }

    public function mac_address(): static
    {
        $this->validationRules[] = ValidationRules::MAC_ADDRESS->value;

        return $this;
    }

    public function present(): static
    {
        $this->validationRules[] = ValidationRules::PRESENT->value;

        return $this;
    }

    public function prohibited(): static
    {
        $this->validationRules[] = ValidationRules::PROHIBITED->value;

        return $this;
    }

    public function timezone(): static
    {
        $this->validationRules[] = ValidationRules::TIMEZONE->value;

        return $this;
    }

    public function url(): static
    {
        $this->validationRules[] = ValidationRules::URL->value;

        return $this;
    }

    public function uuid(): static
    {
        $this->validationRules[] = ValidationRules::UUID->value;

        return $this;
    }

}
