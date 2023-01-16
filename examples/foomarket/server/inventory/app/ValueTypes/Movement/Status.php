<?php

declare(strict_types=1);

namespace App\ValueTypes\Movement;

enum Status: string
{
    case New = 'new';
    case Processing = 'processing';
    case Canceled = 'canceled';
    case Completed = 'completed';

    public static function getInitial(): self
    {
        return self::New;
    }

    /**
     * @return Status[]
     */
    public static function getConcludes(): array
    {
        return [
            self::Canceled,
            self::Completed,
        ];
    }

}
