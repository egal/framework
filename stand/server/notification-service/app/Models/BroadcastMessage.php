<?php
namespace App\Models;

use Carbon\Carbon;
use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class BroadcastMessage extends Model
{
    protected $appends = ['active'];
    public function getActiveAttribute()
    {
        if ($this->starts_at < Carbon::now() && $this->ends_at > Carbon::now()) {
            return true;
        } else {
            return false;
        }
    }
    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::UUID))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('message', VariableType::STRING),
                FieldMetadata::make('background_color', VariableType::STRING),
                FieldMetadata::make('starts_at', VariableType::DATETIME),
                FieldMetadata::make('ends_at', VariableType::DATETIME),
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
