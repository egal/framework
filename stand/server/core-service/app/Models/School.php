<?php

namespace App\Models;

use Egal\Model\Enums\AttributeType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class School extends Model
{

    use HasFactory;

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', AttributeType::UUID))
            ->addFields([
                FieldMetadata::make('name', AttributeType::STRING)
                    ->required()
                    ->addValidationRule('unique:schools,name'),
                FieldMetadata::make('avatar', AttributeType::STRING),
                FieldMetadata::make('created_at', AttributeType::DATETIME),
                FieldMetadata::make('updated_at', AttributeType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'students',
                    RelationType::HAS_MANY,
                )
            ])
            ->addActions([
                ActionMetadata::make('create'),
                ActionMetadata::make('update')->addParameters(
                    [
                        ActionParameterMetadata::make('id', AttributeType::UUID)
                            ->required()
                            ->addValidationRule('exists:schools,id')
                    ]
                ),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('delete')->addParameters(
                    [
                        ActionParameterMetadata::make('id', AttributeType::UUID)
                            ->required()
                            ->addValidationRule('exists:schools,id')
                    ]
                ),
                ActionMetadata::make('getItem')->addParameters(
                    [
                        ActionParameterMetadata::make('id', AttributeType::UUID)
                            ->required()
                            ->addValidationRule('exists:schools,id')
                    ]
                ),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
