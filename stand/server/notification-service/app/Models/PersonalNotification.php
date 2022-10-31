<?php
namespace App\Models;

use App\Policies\PersonalNotificationPolicy;
use Carbon\Carbon;
use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class PersonalNotification extends Model
{
    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::UUID))
            ->policy(PersonalNotificationPolicy::class)
            ->addFields([
                FieldMetadata::make('message', VariableType::STRING)->required(),
                FieldMetadata::make('checked', VariableType::BOOLEAN)->required(),
                FieldMetadata::make('user_id', VariableType::UUID)->required(),
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
