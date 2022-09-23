<?php

namespace App\Models;

use Egal\Model\Enums\AttributeType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
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
        return ModelMetadata::make(self::class, FieldMetadata::make('id', AttributeType::INTEGER))
            ->addFields([
                FieldMetadata::make('speaker_id', AttributeType::UUID)
                    ->addValidationRule('exists:speakers,id')
                    ->required(),
                FieldMetadata::make('school_id', AttributeType::UUID)
                    ->addValidationRule('exists:schools,id')
                    ->required(),
                FieldMetadata::make('stage', AttributeType::STRING)
                    ->string()
                    ->required(),
                FieldMetadata::make('supposedly_lesson_starts_at', AttributeType::DATETIME)
                    ->date(),
                FieldMetadata::make('created_at', AttributeType::DATETIME),
                FieldMetadata::make('updated_at', AttributeType::DATETIME),
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
                ActionMetadata::make('create'),
                ActionMetadata::make('update')->addParameters(
                    [
                        ActionParameterMetadata::make('id', AttributeType::INTEGER)
                            ->required()
                            ->addValidationRule('exists:lesson_requests,id')
                    ]
                ),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('delete')->addParameters(
                    [
                        ActionParameterMetadata::make('id', AttributeType::INTEGER)
                            ->required()
                            ->addValidationRule('exists:lesson_requests,id')
                    ]
                ),
                ActionMetadata::make('getItem')->addParameters(
                    [
                        ActionParameterMetadata::make('id', AttributeType::INTEGER)
                            ->required()
                            ->addValidationRule('exists:lesson_requests,id')
                    ]
                ),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
