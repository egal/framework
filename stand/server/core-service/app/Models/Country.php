<?php

namespace App\Models;

use Egal\Model\Enums\FieldType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
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

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldType::STRING))
            ->addFields([
                FieldMetadata::make('name', FieldType::STRING)
                    ->required()
                    ->addValidationRule('unique:countries,name'),
                FieldMetadata::make('created_at', FieldType::DATETIME),
                FieldMetadata::make('updated_at', FieldType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'speakers',
                    Speaker::class,
                    RelationType::HAS_MANY,
                )
            ])
            ->addActions([
                ActionMetadata::make('create'),
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
