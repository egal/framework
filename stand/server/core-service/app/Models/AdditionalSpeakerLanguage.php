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
                    ->addValidationRule('exists:languages,id')
                    ->fillable(),
                FieldMetadata::make('speaker_id', AttributeType::UUID)
                    ->addValidationRule('exists:speakers,id')
                    ->required()
                    ->fillable(),
                FieldMetadata::make('created_at', AttributeType::DATETIME),
                FieldMetadata::make('updated_at', AttributeType::DATETIME),
            ])
            ->addActions([
                ActionMetadata::make('create')->addParameters(
                    [
                        ActionParameterMetadata::make('language_id', AttributeType::STRING)
                            ->required()
                            ->setDefaultValue('en'),
                        ActionParameterMetadata::make('speaker_id', AttributeType::STRING)
                            ->required()
                            ->addValidationRule('exists:speakers,id')
                    ],

                ),
                ActionMetadata::make('update'),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('delete'),
                ActionMetadata::make('getItem'),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
