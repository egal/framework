<?php

namespace App\Models;

use Egal\Model\Enums\FieldType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model as EgalModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Speaker extends EgalModel
{

    public function countries(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function languages(): HasManyThrough
    {
        return $this->hasManyThrough(Language::class, AdditionalSpeakerLanguage::class);
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldType::UUID))
            ->addFields([
                FieldMetadata::make('user_id', FieldType::UUID)
                    ->required()
                    ->fillable()
                    ->hidden(),
                FieldMetadata::make('name', FieldType::STRING)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('surname', FieldType::STRING)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('avatar', FieldType::STRING)
                    ->fillable(),
                FieldMetadata::make('video', FieldType::STRING)
                    ->fillable(),
                FieldMetadata::make('country_id', FieldType::STRING)
                    ->addValidationRule('exists:countries,id')
                    ->required()
                    ->fillable(),
                FieldMetadata::make('created_at', FieldType::DATE),
                FieldMetadata::make('updated_at', FieldType::DATE),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'country',
                    RelationType::BELONGS_TO,
                ),
                RelationMetadata::make(
                    'languages',
                    RelationType::HAS_MANY_THROUGH,
                ),
            ])
            ->addActions([
                ActionMetadata::make('getItems'),
                ActionMetadata::make('create'),
                ActionMetadata::make('update'),
            ]);
    }

}
