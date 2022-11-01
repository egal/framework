<?php

namespace App\Models;

use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class EmailNotification extends Model
{
    protected static function boot()
    {
        parent::boot();
        static::created(fn(self $notification) => $notification->applyEvents());
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('body', VariableType::STRING)->required(),
                FieldMetadata::make('checked', VariableType::BOOLEAN)->required(),
                FieldMetadata::make('user_id', VariableType::UUID)->required(),
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
    private function applyEvents()
    {

    }
}
