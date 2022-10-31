<?php
namespace App\Models;

use Carbon\Carbon;
use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;

class PersonalNotification extends Model
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
                FieldMetadata::make('checked', VariableType::BOOLEAN),
                FieldMetadata::make('user_id', VariableType::UUID),
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
