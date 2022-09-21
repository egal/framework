<?php

namespace App\Models;

use Egal\Model\Enums\FieldType;
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
        return ModelMetadata::make(Employee::class, FieldMetadata::make('id',FieldType::UUID))
            ->addFields([
                FieldMetadata::make('address', FieldType::STRING)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('phone', FieldType::INTEGER)
                    ->required()
                    ->fillable()
                    ->addValidationRule('unique:employees,phone'),
                FieldMetadata::make('adult', FieldType::BOOLEAN)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('weight', FieldType::NUMERIC)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('created_at', FieldType::DATETIME)
                    ->guarded()
                    ->fillable(),
                FieldMetadata::make('updated_at', FieldType::DATETIME)
                    ->guarded()
                    ->fillable(),
            ])
            ->addFakeFields([
                FieldMetadata::make('height',  FieldType::NUMERIC)
                    ->sometimes()
                    ->required()
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
