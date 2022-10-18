<?php

namespace App\Models;

use Egal\Auth\Policies\AllowAllPolicy;
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
            ->policy(AllowAllPolicy::class)
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
                ActionMetadata::make('create'),
                ActionMetadata::make('update')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:employees,id')
                    ]),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems')
                    ->addParameters([
                        ActionParameterMetadata::make('pagination', VariableType::ARRAY)
                            ->nullable(),
                        ActionParameterMetadata::make('relations', VariableType::ARRAY)
                            ->nullable(),
                        ActionParameterMetadata::make('filter', VariableType::ARRAY)
                            ->nullable(),
                        ActionParameterMetadata::make('order', VariableType::ARRAY)
                            ->nullable(),
                    ]),
                ActionMetadata::make('delete')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:employees,id')
                    ]),
                ActionMetadata::make('getItem')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:employees,id'),
                        ActionParameterMetadata::make('relations', VariableType::ARRAY)
                            ->nullable(),
                    ]),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
