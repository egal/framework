<?php

namespace App\Models;

use Egal\Model\Enums\AttributeType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model as EgalModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Speaker extends EgalModel
{

    use HasFactory;

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
        return ModelMetadata::make(self::class, FieldMetadata::make('id', AttributeType::UUID))
            ->addFields([
                FieldMetadata::make('user_id', AttributeType::UUID)
                    ->required()
                    ->fillable()
                    ->hidden(),
                FieldMetadata::make('name', AttributeType::STRING)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('surname', AttributeType::STRING)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('avatar', AttributeType::STRING)
                    ->fillable(),
                FieldMetadata::make('video', AttributeType::STRING)
                    ->fillable(),
                FieldMetadata::make('country_id', AttributeType::STRING)
                    ->addValidationRule('exists:countries,id')
                    ->required()
                    ->fillable(),
                FieldMetadata::make('created_at', AttributeType::DATETIME),
                FieldMetadata::make('updated_at', AttributeType::DATETIME),
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
                ActionMetadata::make('create'),
                ActionMetadata::make('update'),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('delete'),
                ActionMetadata::make('getItem'),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
