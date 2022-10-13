<?php

namespace App\Policies;

class AllowPolicy
{

    public static function __callStatic(string $name, array $arguments): bool
    {
        return true;
    }

}
