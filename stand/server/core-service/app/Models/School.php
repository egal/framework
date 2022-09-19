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

class School extends Model
{

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldType::UUID))
            ->addFields([
                FieldMetadata::make('name', FieldType::STRING)
                    ->required()
                    ->addValidationRule('unique:schools,name')
                    ->fillable(),
                FieldMetadata::make('avatar', FieldType::STRING)
                    ->fillable(),
                FieldMetadata::make('created_at', FieldType::DATE),
                FieldMetadata::make('updated_at', FieldType::DATE),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'students',
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
