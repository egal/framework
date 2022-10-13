<?php

namespace App\Models;

use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
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
        return ModelMetadata::make(Employee::class, FieldMetadata::make('id', VariableType::UUID))
            ->addFields([
                FieldMetadata::make('address', VariableType::STRING)
                    ->default('Home Address'),
                FieldMetadata::make('phone', VariableType::INTEGER)
                    ->nullable()
                    ->addValidationRule('unique:employees,phone'),
                FieldMetadata::make('adult', VariableType::BOOLEAN)
                    ->required(),
                FieldMetadata::make('weight', VariableType::NUMERIC)
                    ->required(),
                FieldMetadata::make('created_at', VariableType::DATETIME)
                    ->guarded(),
                FieldMetadata::make('updated_at', VariableType::DATETIME)
                    ->guarded(),
            ])
            ->addFakeFields([
                FieldMetadata::make('height', VariableType::NUMERIC)
                    ->sometimes()
                    ->required()
            ])
            ->addActions([
                ActionMetadata\CreateActionMetadata::make()
                    ->addParameters([
                        ActionParameterMetadata::make('address', VariableType::STRING)
                            ->default('Home Address'),
                        ActionParameterMetadata::make('phone', VariableType::INTEGER)
                            ->nullable()
                            ->addValidationRule('unique:employees,phone'),
                        ActionParameterMetadata::make('adult', VariableType::BOOLEAN)
                            ->required(),
                        ActionParameterMetadata::make('weight', VariableType::NUMERIC)
                            ->required(),
                        ActionParameterMetadata::make('height', VariableType::NUMERIC)
                            ->sometimes()
                            ->required()
                    ]),
                ActionMetadata\CreateManyActionMetadata::make(),
                ActionMetadata\UpdateActionMetadata::make(static::class, VariableType::UUID),
                ActionMetadata\UpdateManyActionMetadata::make(static::class, VariableType::UUID),
                ActionMetadata\UpdateManyRawActionMetadata::make(),
                ActionMetadata\DeleteActionMetadata::make(static::class, VariableType::UUID),
                ActionMetadata\DeleteManyActionMetadata::make(static::class, VariableType::UUID),
                ActionMetadata\DeleteManyRawActionMetadata::make(),
                ActionMetadata\GetItemsActionMetadata::make(),
                ActionMetadata\GetItemActionMetadata::make(static::class, VariableType::UUID),
                ActionMetadata\GetCountActionMetadata::make(),
                ActionMetadata\GetMetadataActionMetadata::make()
            ]);
    }

}
