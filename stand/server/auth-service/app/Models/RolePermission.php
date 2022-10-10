<?php

namespace App\Models;

use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class RolePermission extends Model
{

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(RolePermission::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->addFields([
                FieldMetadata::make('role_id', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('permission_id', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('created_at', VariableType::DATETIME)
                    ->hidden(),
                FieldMetadata::make('updated_at', VariableType::DATETIME)
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
