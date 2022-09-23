<?php

namespace App\Models;

use Egal\Model\Enums\AttributeType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AdditionalSpeakerLanguage extends Model
{

    use HasFactory;

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', AttributeType::INTEGER))
            ->addFields([
                FieldMetadata::make('language_id', AttributeType::STRING)
                    ->required()
                    ->addValidationRule('exists:languages,id'),
                FieldMetadata::make('speaker_id', AttributeType::UUID)
                    ->addValidationRule('exists:speakers,id')
                    ->required(),
                FieldMetadata::make('created_at', AttributeType::DATETIME),
                FieldMetadata::make('updated_at', AttributeType::DATETIME),
            ])
            ->addActions([
                ActionMetadata::make('create'),
                ActionMetadata::make('update')
                    ->addParameters([
                        ActionParameterMetadata::make('id', AttributeType::INTEGER)
                            ->required()
                            ->addValidationRule('exists:additional_speaker_languages,id')
                    ]),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('delete')
                    ->addParameters([
                        ActionParameterMetadata::make('id', AttributeType::INTEGER)
                            ->required()
                            ->addValidationRule('exists:additional_speaker_languages,id')
                    ]),
                ActionMetadata::make('getItem')
                    ->addParameters([
                        ActionParameterMetadata::make('id', AttributeType::INTEGER)
                            ->required()
                            ->addValidationRule('exists:additional_speaker_languages,id')
                    ]),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
