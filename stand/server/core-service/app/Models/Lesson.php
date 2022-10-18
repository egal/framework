<?php

namespace App\Models;

use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies;
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
            ->policy(AllowAllPolicy::class)
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
                ActionMetadataDependencies\CreateActionMetadata::make()
                    ->addParameters([
                        ActionParameterMetadata::make('speaker_id', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:speakers,id'),
                        ActionParameterMetadata::make('school_id', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:schools,id'),
                        ActionParameterMetadata::make('stage', VariableType::STRING)
                            ->required(),
                        ActionParameterMetadata::make('chat_id', VariableType::UUID)
                            ->addValidationRule('unique:lessons,chat_id')
                            ->nullable(),
                        ActionParameterMetadata::make('lesson_request_id', VariableType::INTEGER)
                            ->addValidationRule('exists:lesson_requests,id'),
                        ActionParameterMetadata::make('starts_at', VariableType::DATETIME)
                    ]),
                ActionMetadataDependencies\CreateManyActionMetadata::make(),
                ActionMetadataDependencies\UpdateActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadataDependencies\UpdateManyActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadataDependencies\UpdateManyRawActionMetadata::make(),
                ActionMetadataDependencies\DeleteActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadataDependencies\DeleteManyActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadataDependencies\DeleteManyRawActionMetadata::make(),
                ActionMetadataDependencies\GetItemsActionMetadata::make(),
                ActionMetadataDependencies\GetItemActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadataDependencies\GetCountActionMetadata::make(),
                ActionMetadataDependencies\GetMetadataActionMetadata::make()
            ]);
    }

}
