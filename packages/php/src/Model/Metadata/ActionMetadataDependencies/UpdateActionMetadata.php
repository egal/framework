<?php

declare(strict_types=1);

namespace Egal\Model\Metadata\ActionMetadataDependencies;

use Egal\Model\Enums\VariableType;
use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Metadata\ActionParameterMetadata;
use Illuminate\Support\Str;

/**
 * @package Egal\Model
 */
class UpdateActionMetadata extends BaseActionMetadata
{

    public function __construct(string $modelClass, VariableType $keyType, string $name)
    {
        $this->name = $name;

        $explodedModelClass = explode('\\', $modelClass);
        $tableName = Str::snake(Str::plural(end($explodedModelClass)));
        $keyName = ModelMetadataManager::getModelMetadata($modelClass)->getKey()->getName();

        $this->addParameters([
            ActionParameterMetadata::make('key', $keyType)
                ->required()
                ->addValidationRule("exists:{$tableName},{$keyName}"),
            ActionParameterMetadata::make('attributes', VariableType::ARRAY)
        ]);
    }

    public static function make(string $modelClass, VariableType $keyType): static
    {
        return new static($modelClass, $keyType, 'update');
    }

}
