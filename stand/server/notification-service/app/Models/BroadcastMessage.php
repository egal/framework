<?php
namespace App\Models;

use Carbon\Carbon;
use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class BroadcastMessage extends Model
{
    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::UUID))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('message', VariableType::STRING),
                FieldMetadata::make('background_color', VariableType::STRING),
                FieldMetadata::make('starts_at', VariableType::DATETIME),
                FieldMetadata::make('ends_at', VariableType::DATETIME),
                FieldMetadata::make('active', VariableType::BOOLEAN),
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
