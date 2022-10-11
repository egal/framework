<?php

declare(strict_types=1);

namespace Egal\Model\Metadata\ActionMetadata;

use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionParameterMetadata;
use Illuminate\Support\Str;

/**
 * @package Egal\Model
 */
class DeleteManyActionMetadata extends BaseActionMetadata
{

    public function __construct(string $modelClass, VariableType $keyType, string $name)
    {
        $this->name = $name;

        $explodedModelClass = explode('\\', $modelClass);
        $tableName = Str::snake(Str::plural(end($explodedModelClass)));

        $this->addParameters([
            ActionParameterMetadata::make('ids', VariableType::ARRAY),
            ActionParameterMetadata::make('ids.*', $keyType)
                ->addValidationRule("exists:{$tableName},id"),

        ]);
    }

    public static function make(string $modelClass, VariableType $keyType): static
    {
        return new static($modelClass, $keyType, 'deleteMany');
    }

}
