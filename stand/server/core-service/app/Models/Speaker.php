<?php

namespace App\Models;

use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadataDependencies;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Speaker extends Model
{

    use HasFactory;

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function languages(): HasManyThrough
    {
        return $this->hasManyThrough(Language::class, AdditionalSpeakerLanguage::class);
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::UUID))
            ->addFields([
                FieldMetadata::make('user_id', VariableType::UUID)
                    ->required()
                    ->hidden(),
                FieldMetadata::make('name', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('surname', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('avatar', VariableType::STRING),
                FieldMetadata::make('video', VariableType::STRING),
                FieldMetadata::make('country_id', VariableType::STRING)
                    ->addValidationRule('exists:countries,id')
                    ->required(),
                FieldMetadata::make('created_at', VariableType::DATETIME),
                FieldMetadata::make('updated_at', VariableType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'country',
                    Country::class,
                    RelationType::BELONGS_TO,
                ),
                RelationMetadata::make(
                    'languages',
                    Language::class,
                    RelationType::HAS_MANY_THROUGH,
                ),
            ])
            ->addActions([
                ActionMetadataDependencies\CreateActionMetadata::make()
                    ->addParameters([
                        ActionParameterMetadata::make('user_id', VariableType::UUID)
                            ->required(),
                        ActionParameterMetadata::make('name', VariableType::STRING)
                            ->required(),
                        ActionParameterMetadata::make('surname', VariableType::STRING)
                            ->required(),
                        ActionParameterMetadata::make('avatar', VariableType::STRING)
                            ->nullable(),
                        ActionParameterMetadata::make('video', VariableType::STRING)
                            ->nullable(),
                        ActionParameterMetadata::make('country_id', VariableType::STRING)
                            ->addValidationRule('exists:countries,id')
                            ->required(),
                    ]),
                ActionMetadataDependencies\CreateManyActionMetadata::make(),
                ActionMetadataDependencies\UpdateActionMetadata::make(static::class, VariableType::UUID),
                ActionMetadataDependencies\UpdateManyActionMetadata::make(static::class, VariableType::UUID),
                ActionMetadataDependencies\UpdateManyRawActionMetadata::make(),
                ActionMetadataDependencies\DeleteActionMetadata::make(static::class, VariableType::UUID),
                ActionMetadataDependencies\DeleteManyActionMetadata::make(static::class, VariableType::UUID),
                ActionMetadataDependencies\DeleteManyRawActionMetadata::make(),
                ActionMetadataDependencies\GetItemsActionMetadata::make(),
                ActionMetadataDependencies\GetItemActionMetadata::make(static::class, VariableType::UUID),
                ActionMetadataDependencies\GetCountActionMetadata::make(),
                ActionMetadataDependencies\GetMetadataActionMetadata::make()
            ]);
    }

}
