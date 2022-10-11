<?php

namespace App\Models;

use Egal\Model\Enums\VariableType;
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
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->addFields([
                FieldMetadata::make('language_id', VariableType::STRING)
                    ->required()
                    ->addValidationRule('exists:languages,id'),
                FieldMetadata::make('speaker_id', VariableType::UUID)
                    ->addValidationRule('exists:speakers,id')
                    ->required(),
                FieldMetadata::make('created_at', VariableType::DATETIME),
                FieldMetadata::make('updated_at', VariableType::DATETIME),
            ])
            ->addActions([
                ActionMetadata\CreateActionMetadata::make()
                    ->addParameters([
                        ActionParameterMetadata::make('attributes.speaker_id', VariableType::UUID)
                            ->addValidationRule('exists:speakers,id')
                            ->required(),
                        ActionParameterMetadata::make('attributes.language_id', VariableType::STRING)
                            ->required()
                            ->addValidationRule('exists:languages,id'),
                    ]),
                ActionMetadata\CreateManyActionMetadata::make(),
                ActionMetadata\UpdateActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadata\UpdateManyActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadata\UpdateManyRawActionMetadata::make(),
                ActionMetadata\DeleteActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadata\DeleteManyActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadata\DeleteManyRawActionMetadata::make(),
                ActionMetadata\GetItemsActionMetadata::make(),
                ActionMetadata\GetItemActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadata\GetCountActionMetadata::make(),
                ActionMetadata\GetMetadataActionMetadata::make()
            ]);
    }

}
