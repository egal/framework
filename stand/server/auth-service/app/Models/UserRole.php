<?php

namespace App\Models;

use Egal\Model\Enums\FieldType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class UserRole extends Model
{

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(UserRole::class, FieldMetadata::make('id', FieldType::INTEGER))
            ->addFields([
                FieldMetadata::make('user_id', FieldType::UUID)
                    ->required()
                    ->uuid()
                    ->fillable()
                    ->addValidationRule('exists:users'),
                FieldMetadata::make('role_id', FieldType::STRING)
                    ->required()
                    ->string()
                    ->fillable()
                    ->addValidationRule('exists:roles'),
                FieldMetadata::make('created_at', FieldType::DATETIME)
                    ->hidden(),
                FieldMetadata::make('updated_at', FieldType::DATETIME)
                    ->hidden(),
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
