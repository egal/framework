<?php

namespace Egal\Model\Metadata\StatusFieldMetadata;

use BackedEnum;

class Transaction
{

    public function __construct(
        public readonly mixed $from,
        public readonly mixed $to,
    )
    {
    }

    public static function make(
        string|BackedEnum $from,
        string|BackedEnum $to,
    ): self
    {
        return new static(
            $from instanceof BackedEnum ? $from->value : $from,
            $to instanceof BackedEnum ? $to->value : $to,
        );
    }

}
