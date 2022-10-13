<?php

declare(strict_types=1);

namespace Egal\Model\Metadata;

use Egal\Model\Metadata\ActionMetadataDependencies\BaseActionMetadata;

/**
 * @package Egal\Model
 */
class ActionMetadata extends BaseActionMetadata
{

    public function __construct(string $name)
    {
        $this->name = $name;
    }

    public static function make(string $name): static
    {
        return new static($name);
    }

}
