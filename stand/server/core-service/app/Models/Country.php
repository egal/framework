<?php

namespace App\Models;

use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Country extends Model
{

    use HasFactory;

    public function speakers(): HasMany
    {
        return $this->hasMany(Speaker::class);
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::STRING))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('name', VariableType::STRING)
                    ->required()
                    ->addValidationRule('unique:countries,name'),
                FieldMetadata::make('created_at', VariableType::DATETIME),
                FieldMetadata::make('updated_at', VariableType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'speakers',
                    Speaker::class,
                    RelationType::HAS_MANY,
                )
            ])
            ->addActions([
                ActionMetadata::make('create'),
                ActionMetadata::make('update')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::STRING)
                            ->required()
                            ->addValidationRule('exists:countries,id')
                    ]),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems')
                    ->addParameters([
                        ActionParameterMetadata::make('pagination', VariableType::ARRAY)
                            ->nullable(),
                        ActionParameterMetadata::make('relations', VariableType::ARRAY)
                            ->nullable(),
                        ActionParameterMetadata::make('filter', VariableType::ARRAY)
                            ->nullable(),
                        ActionParameterMetadata::make('order', VariableType::ARRAY)
                            ->nullable(),
                    ]),
                ActionMetadata::make('delete')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::STRING)
                            ->required()
                            ->addValidationRule('exists:countries,id')
                    ]),
                ActionMetadata::make('getItem')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::STRING)
                            ->required()
                            ->addValidationRule('exists:countries,id'),
                        ActionParameterMetadata::make('relations', VariableType::ARRAY)
                            ->nullable(),
                    ]),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
