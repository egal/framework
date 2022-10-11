<?php

namespace App\Models;

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
                ActionMetadata\CreateActionMetadata::make()
                    ->addParameters([
                        ActionParameterMetadata::make('name', VariableType::STRING)
                            ->required()
                            ->addValidationRule('unique:countries,name'),
                        ActionParameterMetadata::make('id', VariableType::STRING)
                            ->required()
                            ->addValidationRule('unique:countries,id'),
                    ]),
                ActionMetadata\CreateManyActionMetadata::make(),
                ActionMetadata\UpdateActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadata\UpdateManyActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadata\UpdateManyRawActionMetadata::make(),
                ActionMetadata\DeleteActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadata\DeleteManyActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadata\DeleteManyRawActionMetadata::make(),
                ActionMetadata\GetItemsActionMetadata::make(),
                ActionMetadata\GetItemActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadata\GetCountActionMetadata::make(),
                ActionMetadata\GetMetadataActionMetadata::make()
            ]);
    }

}
