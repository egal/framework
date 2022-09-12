<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class UserRole extends Model
{

    protected $fillable = [
        'user_id',
        'role_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(UserRole::class, FieldMetadata::make('id',FieldTypeEnum::INTEGER))
            ->addFields([
                FieldMetadata::make('user_id', FieldTypeEnum::UUID)
                    ->required()
                    ->uuid()
                    ->addValidationRule('exists:users')
                ,
                FieldMetadata::make('role_id', FieldTypeEnum::STRING)
                    ->required()
                    ->string()
                    ->addValidationRule('exists:roles')
                ,
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME)
            ])
            ->addActions([
                'getItem',
                'getItems',
                'create',
                'update',
                'delete'
            ]);
    }

}
