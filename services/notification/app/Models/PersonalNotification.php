<?php

namespace App\Models;

use App\Policies\PersonalNotificationPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class PersonalNotification extends Model
{

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->policy(PersonalNotificationPolicy::class)
            ->addFields([
                FieldMetadata::make('user_key', VariableType::UUID)
                    ->required(),
                FieldMetadata::make('title', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('text', VariableType::STRING)
                    ->nullable(),
                FieldMetadata::make('checked', VariableType::BOOLEAN)
                    ->nullable()
                    ->default(false),
            ])
            ->addActions([
                ActionMetadataBlanks::getMetadata(),
                ActionMetadataBlanks::getItem(VariableType::INTEGER),
                ActionMetadataBlanks::getItems(),
                ActionMetadataBlanks::create(),
                ActionMetadataBlanks::update(VariableType::INTEGER),
            ]);
    }

}
