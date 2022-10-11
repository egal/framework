<?php

declare(strict_types=1);

namespace Egal\Model\Metadata\ActionMetadata;

/**
 * @package Egal\Model
 */
class GetMetadataActionMetadata extends BaseActionMetadata
{

    public function __construct(string $name)
    {
        $this->name = $name;
    }

    public static function make(): static
    {
        return new static('getMetadata');
    }

}
