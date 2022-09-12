<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class RolePermission extends Model
{

    protected $fillable = [
        'role_id',
        'permission_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(RolePermission::class, FieldMetadata::make('id',FieldTypeEnum::INTEGER))
            ->addFields([
                FieldMetadata::make('role_id', FieldTypeEnum::STRING)
                    ->required()
                    ->string()
                ,
                FieldMetadata::make('permission_id', FieldTypeEnum::INTEGER)
                    ->required()
                    ->string()
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
