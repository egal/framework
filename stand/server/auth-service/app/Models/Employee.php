<?php

namespace App\Models;

use Egal\Model\Enums\FieldType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use Egal\Model\Traits\UsesUuidKey;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Employee extends Model
{

    use UsesUuidKey;
    use HasFactory;
    use HasRelationships;

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(Employee::class, FieldMetadata::make('id',FieldType::STRING))
            ->addFields([
                FieldMetadata::make('address', FieldType::STRING)
                    ->required()
                    ->string()
                    ->fillable()
                ,
                FieldMetadata::make('phone', FieldType::INTEGER)
                    ->required()
                    ->integer()
                    ->fillable()
                    ->addValidationRule('unique:employees,phone')
                ,
                FieldMetadata::make('adult', FieldType::BOOLEAN)
                    ->required()
                    ->boolean()
                    ->fillable()
                ,
                FieldMetadata::make('weight', FieldType::NUMERIC)
                    ->required()
                    ->numeric()
                    ->fillable()
                ,
                FieldMetadata::make('created_at', FieldType::DATETIME)
                    ->guarded()
                    ->fillable()
                ,
                FieldMetadata::make('updated_at', FieldType::DATETIME)
                    ->guarded()
                    ->fillable()
                ,
            ])
            ->addFakeFields([
                FieldMetadata::make('height',  FieldType::NUMERIC)
                    ->sometimes()
                    ->required()
                    ->numeric()
            ])
            ->addActions([
                ActionMetadata::make('getItems'),
                ActionMetadata::make('create'),
                ActionMetadata::make('update'),
            ]);
    }

}
