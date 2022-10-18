<?php

namespace App\Models;

use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadataDependencies;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class RolePermission extends Model
{

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(RolePermission::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->policy(AllowAllPolicy::class)
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
                ActionMetadataDependencies\CreateActionMetadata::make()
                    ->addParameters([
                        ActionParameterMetadata::make('permission_id', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:permissions'),
                        ActionParameterMetadata::make('role_id', VariableType::STRING)
                            ->required()
                            ->addValidationRule('exists:roles'),
                    ]),
                ActionMetadataDependencies\CreateManyActionMetadata::make(),
                ActionMetadataDependencies\UpdateActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadataDependencies\UpdateManyActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadataDependencies\UpdateManyRawActionMetadata::make(),
                ActionMetadataDependencies\DeleteActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadataDependencies\DeleteManyActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadataDependencies\DeleteManyRawActionMetadata::make(),
                ActionMetadataDependencies\GetItemsActionMetadata::make(),
                ActionMetadataDependencies\GetItemActionMetadata::make(static::class, VariableType::INTEGER),
                ActionMetadataDependencies\GetCountActionMetadata::make(),
                ActionMetadataDependencies\GetMetadataActionMetadata::make()
            ]);
    }

}
