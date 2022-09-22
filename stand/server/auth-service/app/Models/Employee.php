<?php

namespace App\Models;

use Egal\Model\Enums\AttributeType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Employee extends Model
{

    use HasFactory;
    use HasRelationships;

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(Employee::class, FieldMetadata::make('id',AttributeType::STRING))
            ->addFields([
                FieldMetadata::make('address', AttributeType::STRING)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('phone', AttributeType::INTEGER)
                    ->required()
                    ->fillable()
                    ->addValidationRule('unique:employees,phone'),
                FieldMetadata::make('adult', AttributeType::BOOLEAN)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('weight', AttributeType::NUMERIC)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('created_at', AttributeType::DATETIME)
                    ->guarded()
                    ->fillable(),
                FieldMetadata::make('updated_at', AttributeType::DATETIME)
                    ->guarded()
                    ->fillable(),
            ])
            ->addFakeFields([
                FieldMetadata::make('height',  AttributeType::NUMERIC)
                    ->sometimes()
                    ->required()
            ])
            ->addActions([
                ActionMetadata::make('getItems'),
                ActionMetadata::make('create'),
                ActionMetadata::make('update'),
            ]);
    }

}
