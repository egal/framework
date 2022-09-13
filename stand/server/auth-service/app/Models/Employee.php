<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
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

    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(Employee::class, FieldMetadata::make('id',FieldTypeEnum::UUID))
            ->addFields([
                FieldMetadata::make('address', FieldTypeEnum::STRING)
                    ->required()
                    ->string()
                ,
                FieldMetadata::make('phone', FieldTypeEnum::INTEGER)
                    ->required()
                    ->integer()
                    ->addValidationRule('unique:employees,phone')
                ,
                FieldMetadata::make('adult', FieldTypeEnum::BOOLEAN)
                    ->required()
                    ->boolean()
                ,
                FieldMetadata::make('weight', FieldTypeEnum::NUMERIC)
                    ->required()
                    ->numeric()
                ,
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME)
            ])
            ->addFakeFields([
                FieldMetadata::make('height',  FieldTypeEnum::FLOAT)
                    ->sometimes()
                    ->required()
                    ->numeric()
            ])
            ->addActions([
                'getItems',
                'create',
                'update'
            ]);
    }

}
