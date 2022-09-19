<?php

namespace App\Models;

use Egal\Model\Enums\FieldType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class AdditionalSpeakerLanguage extends Model
{

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldType::INTEGER))
            ->addFields([
                FieldMetadata::make('language_id', FieldType::STRING)
                    ->required()
                    ->addValidationRule('exists:languages,id')
                    ->fillable(),
                FieldMetadata::make('speaker_id', FieldType::UUID)
                    ->addValidationRule('exists:speakers,id')
                    ->required()
                    ->fillable(),
                FieldMetadata::make('created_at', FieldType::DATE),
                FieldMetadata::make('updated_at', FieldType::DATE),
            ])
            ->addActions([
                ActionMetadata::make('getItems'),
                ActionMetadata::make('create'),
                ActionMetadata::make('update'),
            ]);
    }

}
