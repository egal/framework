<?php

declare(strict_types=1);

namespace Egal\Validation\Rules;

use Illuminate\Contracts\Validation\Rule as IlluminateValidationRule;
use Illuminate\Support\Str;
use ReflectionClass;

abstract class Rule implements IlluminateValidationRule
{

    protected const VALIDATE_FUNCTION_NAME = 'validate';

    protected string $rule;

    abstract public function validate($attribute, $value, $parameters = null): bool;

    /**
     * @param string $attribute
     * @param mixed $value
     * @noinspection PhpMissingReturnTypeInspection
     */
    public function passes($attribute, $value): bool
    {
        return $this->validate($attribute, $value);
    }

    public function message(): string
    {
        return 'Rule check failed '
            . (new ReflectionClass(static::class))->getShortName()
            . ' of :attribute attribute!';
    }

    public function getCallback(): string
    {
        return static::class . '@' . static::VALIDATE_FUNCTION_NAME;
    }

    public function getRule(): string
    {
        return $this->rule ?? Str::snake(str_replace(
            'Rule',
            '',
            (new ReflectionClass(static::class))->getShortName()
        ));
    }

}
