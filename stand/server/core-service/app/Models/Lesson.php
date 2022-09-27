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
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lesson extends Model
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
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->addFields([
                FieldMetadata::make('speaker_id', VariableType::UUID)
                    ->required()
                    ->addValidationRule('exists:speakers,id'),
                FieldMetadata::make('school_id', VariableType::UUID)
                    ->required()
                    ->addValidationRule('exists:schools,id'),
                FieldMetadata::make('stage', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('chat_id', VariableType::UUID)
                    ->addValidationRule('unique:lessons,chat_id')
                    ->nullable(),
                FieldMetadata::make('lesson_request_id', VariableType::INTEGER)
                    ->addValidationRule('exists:lesson_requests,id'),
                FieldMetadata::make('starts_at', VariableType::DATETIME)
                    ->date(),
                FieldMetadata::make('created_at', VariableType::DATETIME),
                FieldMetadata::make('updated_at', VariableType::DATETIME),
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
                ActionMetadata::make('update')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::INTEGER)
                            ->required()
                            ->addValidationRule('exists:lessons,id')
                    ]),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('delete')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::INTEGER)
                            ->required()
                            ->addValidationRule('exists:lessons,id')
                    ]),
                ActionMetadata::make('getItem')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::INTEGER)
                            ->required()
                            ->addValidationRule('exists:lessons,id')
                    ]),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
