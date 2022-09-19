<?php

namespace App\Models;

use Egal\Model\Enums\FieldType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Country extends Model
{

    public function speakers(): HasMany
    {
        return $this->hasMany(Speaker::class);
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldType::STRING))
            ->addFields([
                FieldMetadata::make('name', FieldType::STRING)
                    ->required()
                    ->addValidationRule('unique:countries,name')
                    ->fillable(),
                FieldMetadata::make('created_at', FieldType::DATETIME),
                FieldMetadata::make('updated_at', FieldType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'speakers',
                    RelationType::HAS_MANY,
                )
            ])
            ->addActions([
                ActionMetadata::make('getItems'),
                ActionMetadata::make('create'),
                ActionMetadata::make('update'),
            ]);
    }

}
