<?php

namespace App\Policies;

/**
 * @method static bool retrieving(string $name, array $arguments))
 * @method static bool retrieved(string $name, array $arguments))
 * @method static bool creating(string $name, array $arguments))
 * @method static bool created(string $name, array $arguments))
 * @method static bool updating(string $name, array $arguments))
 * @method static bool updated(string $name, array $arguments))
 */
class AllowPolicy
{

    public static function __callStatic(string $name, array $arguments): bool
    {
        return true;
    }

}
