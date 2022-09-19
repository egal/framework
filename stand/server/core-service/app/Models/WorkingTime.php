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

class WorkingTime extends Model
{

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldType::INTEGER))
            ->addFields([
                FieldMetadata::make('speaker_id', FieldType::UUID)
                    ->addValidationRule('exists:speakers,id')
                    ->required()
                    ->fillable(),
                FieldMetadata::make('starts_at', FieldType::DATE)
                    ->fillable(),
                FieldMetadata::make('ends_at', FieldType::DATE)
                    ->fillable(),
                FieldMetadata::make('created_at', FieldType::DATE),
                FieldMetadata::make('updated_at', FieldType::DATE),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'school',
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
