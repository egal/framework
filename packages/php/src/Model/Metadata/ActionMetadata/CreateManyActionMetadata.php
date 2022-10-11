<?php

declare(strict_types=1);

namespace Egal\Model\Metadata\ActionMetadata;

use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionParameterMetadata;

/**
 * @package Egal\Model
 */
class CreateManyActionMetadata extends BaseActionMetadata
{

    public function __construct(string $name)
    {
        $this->name = $name;

        $this->addParameters([
            ActionParameterMetadata::make('objects', VariableType::ARRAY)
                ->required()
        ]);
    }

    public static function make(): static
    {
        return new static('createMany');
    }

}
