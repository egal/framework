<?php

declare(strict_types=1);

namespace Egal\Model\Metadata\ActionMetadataDependencies;

use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionParameterMetadata;

/**
 * @package Egal\Model
 */
class GetItemsActionMetadata extends BaseActionMetadata
{

    public function __construct(string $name)
    {
        $this->name = $name;

        $this->addParameters([
            ActionParameterMetadata::make('pagination', VariableType::ARRAY)
                ->nullable(),
            ActionParameterMetadata::make('relations', VariableType::ARRAY)
                ->nullable(),
            ActionParameterMetadata::make('filter', VariableType::ARRAY)
                ->nullable(),
            ActionParameterMetadata::make('order', VariableType::ARRAY)
                ->nullable()
        ]);
    }

    public static function make(): static
    {
        return new static('getItems');
    }

}
