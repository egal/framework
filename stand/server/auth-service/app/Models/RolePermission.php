<?php

namespace App\Models;

use Egal\Model\Enums\AttributeType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class RolePermission extends Model
{

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(RolePermission::class, FieldMetadata::make('id', AttributeType::INTEGER))
            ->addFields([
                FieldMetadata::make('role_id', AttributeType::STRING)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('permission_id', AttributeType::STRING)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('created_at', AttributeType::DATETIME)
                    ->hidden(),
                FieldMetadata::make('updated_at', AttributeType::DATETIME)
                    ->hidden(),
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
