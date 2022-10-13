<?php

declare(strict_types=1);

namespace Egal\Model\Metadata\ActionMetadataDependencies;

use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionParameterMetadata;

/**
 * @package Egal\Model
 */
class UpdateManyRawActionMetadata extends BaseActionMetadata
{

    public function __construct(string $name)
    {
        $this->name = $name;

        $this->addParameters([
            ActionParameterMetadata::make('filter', VariableType::ARRAY),
            ActionParameterMetadata::make('attributes', VariableType::ARRAY),
        ]);
    }

    public static function make(): static
    {
        return new static('updateManyRaw');
    }

}
