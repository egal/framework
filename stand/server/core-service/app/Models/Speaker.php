<?php

namespace App\Models;

use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model as EgalModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Speaker extends EgalModel
{

    use HasFactory;

    public function countries(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function languages(): HasManyThrough
    {
        return $this->hasManyThrough(Language::class, AdditionalSpeakerLanguage::class);
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::UUID))
            ->addFields([
                FieldMetadata::make('user_id', VariableType::UUID)
                    ->required()
                    ->hidden(),
                FieldMetadata::make('name', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('surname', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('avatar', VariableType::STRING),
                FieldMetadata::make('video', VariableType::STRING),
                FieldMetadata::make('country_id', VariableType::STRING)
                    ->addValidationRule('exists:countries,id')
                    ->required(),
                FieldMetadata::make('created_at', VariableType::DATETIME),
                FieldMetadata::make('updated_at', VariableType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'country',
                    RelationType::BELONGS_TO,
                ),
                RelationMetadata::make(
                    'languages',
                    RelationType::HAS_MANY_THROUGH,
                ),
            ])
            ->addActions([
                ActionMetadata::make('create'),
                ActionMetadata::make('update')
                    ->addParameters([
                        ActionParameterMetadata::make('id', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:speakers,id')
                    ]),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('delete')
                    ->addParameters([
                        ActionParameterMetadata::make('id', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:speakers,id')
                    ]),
                ActionMetadata::make('getItem')
                    ->addParameters([
                        ActionParameterMetadata::make('id', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:speakers,id')
                    ]),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
