<?php

namespace App\Models;

use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Language extends Model
{

    use HasFactory;

    public function speakers(): HasManyThrough
    {
        return $this->hasManyThrough(Speaker::class, AdditionalSpeakerLanguage::class);
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::STRING))
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::STRING))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('name', VariableType::STRING)
                    ->required()
                    ->addValidationRule('unique:languages,name'),
                FieldMetadata::make('created_at', VariableType::DATETIME),
                FieldMetadata::make('updated_at', VariableType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'speakers',
                    Speaker::class,
                    RelationType::HAS_MANY_THROUGH,
                ),
            ])
            ->addActions([
                ActionMetadataDependencies\CreateActionMetadata::make()
                    ->addParameters([
                        ActionParameterMetadata::make('name', VariableType::STRING)
                            ->required()
                            ->addValidationRule('unique:languages,name'),
                        ActionParameterMetadata::make('id', VariableType::STRING)
                            ->required()
                            ->addValidationRule('unique:languages,id'),
                    ]),
                ActionMetadataDependencies\CreateManyActionMetadata::make(),
                ActionMetadataDependencies\UpdateActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadataDependencies\UpdateManyActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadataDependencies\UpdateManyRawActionMetadata::make(),
                ActionMetadataDependencies\DeleteActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadataDependencies\DeleteManyActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadataDependencies\DeleteManyRawActionMetadata::make(),
                ActionMetadataDependencies\GetItemsActionMetadata::make(),
                ActionMetadataDependencies\GetItemActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadataDependencies\GetCountActionMetadata::make(),
                ActionMetadataDependencies\GetMetadataActionMetadata::make()
                ActionMetadata::make('create'),
                ActionMetadata::make('update')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::STRING)
                            ->required()
                            ->addValidationRule('exists:languages,id')
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
                            ->addValidationRule('exists:languages,id')
                    ]),
                ActionMetadata::make('getItem')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::STRING)
                            ->required()
                            ->addValidationRule('exists:languages,id'),
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
