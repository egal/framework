<?php

namespace App\Models;

use Egal\Model\Enums\AttributeType;
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
        return ModelMetadata::make(Employee::class, FieldMetadata::make('id', AttributeType::UUID))
            ->addFields([
                FieldMetadata::make('address', AttributeType::STRING)
                    ->default('Home Address'),
                FieldMetadata::make('phone', AttributeType::INTEGER)
                    ->nullable()
                    ->addValidationRule('unique:employees,phone'),
                FieldMetadata::make('adult', AttributeType::BOOLEAN)
                    ->required(),
                FieldMetadata::make('weight', AttributeType::NUMERIC)
                    ->required(),
                FieldMetadata::make('created_at', AttributeType::DATETIME)
                    ->guarded(),
                FieldMetadata::make('updated_at', AttributeType::DATETIME)
                    ->guarded(),
            ])
            ->addFakeFields([
                FieldMetadata::make('height', AttributeType::NUMERIC)
                    ->sometimes()
                    ->required()
            ])
            ->addActions([
                ActionMetadata::make('create'),
                ActionMetadata::make('update')
                    ->addParameters([
                        ActionParameterMetadata::make('id', AttributeType::UUID)
                            ->required()
                            ->addValidationRule('exists:employees,id')
                    ]),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('delete')
                    ->addParameters([
                        ActionParameterMetadata::make('id', AttributeType::UUID)
                            ->required()
                            ->addValidationRule('exists:employees,id')
                    ]),
                ActionMetadata::make('getItem')
                    ->addParameters([
                        ActionParameterMetadata::make('id', AttributeType::UUID)
                            ->required()
                            ->addValidationRule('exists:employees,id')
                    ]),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
