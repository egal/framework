<?php

namespace App\Models;

use App\Policies\BroadcastMessagePolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class BroadcastMessage extends Model
{

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::INTEGER))
            ->policy(BroadcastMessagePolicy::class)
            ->addFields([
                FieldMetadata::make('message', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('background_color', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('starts_at', VariableType::DATE)
                    ->required(),
                FieldMetadata::make('ends_at', VariableType::DATE)
                    ->required(),
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
