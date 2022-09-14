<?php

namespace App\Models;

use Egal\Model\Enums\FieldType;
use Egal\Model\Metadata\ActionMetadata;
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
        return ModelMetadata::make(RolePermission::class, FieldMetadata::make('id',FieldType::INTEGER))
            ->addFields([
                FieldMetadata::make('role_id', FieldType::STRING)
                    ->required()
                    ->string()
                ,
                FieldMetadata::make('permission_id', FieldType::INTEGER)
                    ->required()
                    ->string()
                ,
                FieldMetadata::make('created_at', FieldType::DATETIME),
                FieldMetadata::make('updated_at', FieldType::DATETIME)
            ])
            ->addActions([
                ActionMetadata::make('getItem'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('create'),
                ActionMetadata::make('update'),
                ActionMetadata::make('delete'),
            ]);
    }

}
