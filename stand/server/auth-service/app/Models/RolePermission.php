<?php

namespace App\Models;

use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
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
                ActionMetadata\CreateActionMetadata::make()
                    ->addParameters([
                        ActionParameterMetadata::make('permission_id', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:permissions'),
                        ActionParameterMetadata::make('role_id', VariableType::STRING)
                            ->required()
                            ->addValidationRule('exists:roles'),
                    ]),
                ActionMetadata\CreateManyActionMetadata::make(),
                ActionMetadata\UpdateActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadata\UpdateManyActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadata\UpdateManyRawActionMetadata::make(),
                ActionMetadata\DeleteActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadata\DeleteManyActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadata\DeleteManyRawActionMetadata::make(),
                ActionMetadata\GetItemsActionMetadata::make(),
                ActionMetadata\GetItemActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadata\GetCountActionMetadata::make(),
                ActionMetadata\GetMetadataActionMetadata::make()
            ]);
    }

}
