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

class WorkingTime extends Model
{

    use HasFactory;

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('speaker_id', VariableType::UUID)
                    ->addValidationRule('exists:speakers,id')
                    ->required(),
                FieldMetadata::make('starts_at', VariableType::DATETIME)
                    ->date(),
                FieldMetadata::make('ends_at', VariableType::DATETIME)
                    ->date(),
                FieldMetadata::make('created_at', VariableType::DATETIME),
                FieldMetadata::make('updated_at', VariableType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'school',
                    School::class,
                    RelationType::BELONGS_TO,
                )
            ])
            ->addActions([
                ActionMetadataDependencies\CreateActionMetadata::make()
                    ->addParameters([
                        ActionParameterMetadata::make('attributes.speaker_id', VariableType::UUID)
                            ->addValidationRule('exists:speakers,id')
                            ->required(),
                        ActionParameterMetadata::make('attributes.starts_at', VariableType::DATETIME)
                            ->required()
                            ->addValidationRule('date_format:Y-m-d H:i:s'),
                        ActionParameterMetadata::make('attributes.ends_at', VariableType::DATETIME)
                            ->required()
                            ->addValidationRule('date_format:Y-m-d H:i:s'),
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
