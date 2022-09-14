<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use ReflectionException;

class AdditionalSpeakerLanguage extends Model
{
    protected $table = 'additional_speaker_languages';

    protected $fillable = [
        'language_id',
        'speaker_id'
    ];

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldTypeEnum::INTEGER))
            ->addFields([
                FieldMetadata::make('language_id', FieldTypeEnum::STRING)
                    ->string()
                    ->addValidationRule('exists:languages,id')
                    ->required()
                ,
                FieldMetadata::make('speaker_id', FieldTypeEnum::UUID)
                    ->uuid()
                    ->addValidationRule('exists:speakers,id')
                    ->required()
                ,
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME)
            ])
            ->addActions([
                'getItems',
                'create',
                'update'
            ]);
    }
}
