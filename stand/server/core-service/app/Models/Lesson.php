<?php

namespace App\Models;

use Egal\Model\Enums\FieldType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lesson extends Model
{

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
                    ->required()
                    ->addValidationRule('exists:speakers,id')
                    ->fillable(),
                FieldMetadata::make('school_id', FieldType::UUID)
                    ->required()
                    ->addValidationRule('exists:schools,id')
                    ->fillable(),
                FieldMetadata::make('stage', FieldType::STRING)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('chat_id', FieldType::UUID)
                    ->addValidationRule('unique:lessons,chat_id')
                    ->nullable()
                    ->fillable(),
                FieldMetadata::make('lesson_request_id', FieldType::INTEGER)
                    ->fillable()
                    ->addValidationRule('exists:lesson_requests,id'),
                FieldMetadata::make('starts_at', FieldType::DATETIME)
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
            ]);
    }

}
