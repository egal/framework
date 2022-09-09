<?php

namespace App\Metadata;

use ReflectionClass;

trait EnumValuesTrait
{
    public static function getValuesInLowerCase(): array
    {
        $class    = new ReflectionClass(__CLASS__);
        $constant = array_change_key_case($class->getConstants(), CASE_LOWER);
        return array_keys($constant);
    }
}
