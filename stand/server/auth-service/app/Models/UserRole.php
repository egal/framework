<?php

namespace App\Models;

use App\Policies\AllowPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class UserRole extends Model
{

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(UserRole::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->addPolicies([
                AllowPolicy::class,
            ])
            ->addFields([
                FieldMetadata::make('user_id', VariableType::UUID)
                    ->required()
                    ->addValidationRule('exists:users'),
                FieldMetadata::make('role_id', VariableType::STRING)
                    ->required()
                    ->addValidationRule('exists:roles'),
                FieldMetadata::make('created_at', VariableType::DATETIME)
                    ->hidden(),
                FieldMetadata::make('updated_at', VariableType::DATETIME)
                    ->hidden(),
            ])
            ->addActions([
                ActionMetadata::make('create'),
                ActionMetadata::make('update')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::INTEGER)
                            ->required()
                            ->addValidationRule('exists:user_roles,id')
                    ]),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('delete')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::INTEGER)
                            ->required()
                            ->addValidationRule('exists:user_roles,id')
                    ]),
                ActionMetadata::make('getItem')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::INTEGER)
                            ->required()
                            ->addValidationRule('exists:user_roles,id')
                    ]),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
