<?php

namespace App\Models;

use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionMetadataBlanks;
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
            ->policy(AllowAllPolicy::class)
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
                FieldMetadata::make('created_at', VariableType::DATE),
                FieldMetadata::make('updated_at', VariableType::DATE),
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
                ActionMetadataBlanks::getMetadata(),
                ActionMetadataBlanks::getItem(VariableType::STRING),
                ActionMetadataBlanks::getItems(),
                ActionMetadataBlanks::create(),
                ActionMetadataBlanks::update(VariableType::STRING),
                ActionMetadataBlanks::delete(VariableType::STRING),
            ]);
    }

}
