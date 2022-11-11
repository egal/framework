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

class LessonRequest extends Model
{

    use HasFactory;

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('speaker_id', VariableType::UUID)
                    ->addValidationRule('exists:speakers,id')
                    ->required(),
                FieldMetadata::make('school_id', VariableType::UUID)
                    ->addValidationRule('exists:schools,id')
                    ->required(),
                FieldMetadata::make('stage', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('supposedly_lesson_starts_at', VariableType::DATETIME),
                FieldMetadata::make('created_at', VariableType::DATETIME),
                FieldMetadata::make('updated_at', VariableType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'school',
                    School::class,
                    RelationType::BELONGS_TO,
                ),
                RelationMetadata::make(
                    'speaker',
                    Speaker::class,
                    RelationType::BELONGS_TO,
                )
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

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public function speaker(): BelongsTo
    {
        return $this->belongsTo(Speaker::class);
    }

}
