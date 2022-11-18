<?php

namespace App\Models;

use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class UserRole extends Model
{

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(UserRole::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('user_id', VariableType::UUID)
                    ->required()
                    ->addValidationRule('exists:users'),
                FieldMetadata::make('role_id', VariableType::STRING)
                    ->required()
                    ->addValidationRule('exists:roles'),
                FieldMetadata::make('created_at', VariableType::DATE)
                    ->hidden(),
                FieldMetadata::make('updated_at', VariableType::DATE)
                    ->hidden(),
            ])
            ->addActions([
                ActionMetadataBlanks::getMetadata(),
                ActionMetadataBlanks::getItem(VariableType::STRING),
                ActionMetadataBlanks::getItems(),
                ActionMetadataBlanks::create(),
                ActionMetadataBlanks::update(VariableType::STRING),
                ActionMetadataBlanks::delete(VariableType::STRING),
            ]);
    }

}
