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
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('message', VariableType::STRING)->required(),
                FieldMetadata::make('background_color', VariableType::STRING)->required(),
                FieldMetadata::make('starts_at', VariableType::DATETIME)->required(),
                FieldMetadata::make('ends_at', VariableType::DATETIME)->required(),
                FieldMetadata::make('active', VariableType::BOOLEAN),
            ])
            ->addActions([
                ActionMetadataBlanks::getMetadata(),
                ActionMetadataBlanks::getItem(VariableType::INTEGER),
                ActionMetadataBlanks::getItems(),
                ActionMetadataBlanks::create(),
                ActionMetadataBlanks::update(VariableType::INTEGER),
                ActionMetadataBlanks::delete(VariableType::INTEGER),
            ]);
    }

}
