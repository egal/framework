<?php

namespace App\Models;

use Egal\Model\Enums\FieldType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LessonRequest extends Model
{

    use HasFactory;

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public function speaker(): BelongsTo
    {
        return $this->belongsTo(Speaker::class);
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldType::INTEGER))
            ->addFields([
                FieldMetadata::make('speaker_id', FieldType::UUID)
                    ->addValidationRule('exists:speakers,id')
                    ->required()
                    ->fillable()
                ,
                FieldMetadata::make('school_id', FieldType::UUID)
                    ->addValidationRule('exists:schools,id')
                    ->required()
                    ->fillable()
                ,
                FieldMetadata::make('stage', FieldType::STRING)
                    ->string()
                    ->required()
                    ->fillable()
                ,
                FieldMetadata::make('supposedly_lesson_starts_at', FieldType::DATETIME)
                    ->date()
                    ->fillable(),
                FieldMetadata::make('created_at', FieldType::DATETIME),
                FieldMetadata::make('updated_at', FieldType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'school',
                    RelationType::BELONGS_TO,
                ),
                RelationMetadata::make(
                    'speaker',
                    RelationType::BELONGS_TO,
                )
            ])
            ->addActions([
                ActionMetadata::make('getItems'),
                ActionMetadata::make('create'),
                ActionMetadata::make('update'),
                ActionMetadata::make('getMetadata'),
            ]);
    }

}
