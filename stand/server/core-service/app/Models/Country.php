<?php

namespace App\Models;

use Egal\Model\Enums\AttributeType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Exceptions\ValidateException;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Country extends Model
{

    use HasFactory;

    public function speakers(): HasMany
    {
        return $this->hasMany(Speaker::class);
    }

    /**
     * @throws ValidateException
     */
    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', AttributeType::STRING))
            ->addFields([
                FieldMetadata::make('name', AttributeType::STRING)
                    ->required()
                    ->addValidationRule('unique:countries,name')
                    ->fillable(),
                FieldMetadata::make('created_at', AttributeType::DATETIME),
                FieldMetadata::make('updated_at', AttributeType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'speakers',
                    RelationType::HAS_MANY,
                )
            ])
            ->addActions([
                ActionMetadata::make('getItems'),
                ActionMetadata::make('create')
                    ->addParameters(
                        [
                            ActionParameterMetadata::make('name', AttributeType::STRING)
                                ->required(),
                            ActionParameterMetadata::make('id',  AttributeType::STRING)
                                ->required()
                                ->setDefaultValue('22')
                        ]
                    ),
                ActionMetadata::make('update'),
            ]);
    }

}
