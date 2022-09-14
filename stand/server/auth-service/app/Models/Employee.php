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

    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(Employee::class, FieldMetadata::make('id',FieldType::UUID))
            ->addFields([
                FieldMetadata::make('address', FieldType::STRING)
                    ->required()
                    ->string()
                ,
                FieldMetadata::make('phone', FieldType::INTEGER)
                    ->required()
                    ->integer()
                    ->addValidationRule('unique:employees,phone')
                ,
                FieldMetadata::make('adult', FieldType::BOOLEAN)
                    ->required()
                    ->boolean()
                ,
                FieldMetadata::make('weight', FieldType::NUMERIC)
                    ->required()
                    ->numeric()
                ,
                FieldMetadata::make('created_at', FieldType::DATETIME),
                FieldMetadata::make('updated_at', FieldType::DATETIME),
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
