<?php

declare(strict_types=1);

namespace App\ValueTypes\Movement;

enum Type: string
{
    case Fill = 'fill';
    case Fire = 'fire';
}
