<?php

namespace App\Models;

use App\Metadata\FieldMetadata;
use App\Metadata\FieldTypeEnum;
use App\Metadata\ModelMetadataManager;
use App\Metadata\ModelMetadata;
use Egal\Model\Model;
use Faker\Core\DateTime;
use Ramsey\Uuid\Uuid;

/**
 * @property int        $id             {@primary-key}          {@property-type field}
 * @property uuid       $user_id        {@property-type field}  {@validation-rules required|numeric|exists:users}
 * @property string     $role_id        {@property-type field}  {@validation-rules required|string|exists:roles}
 * @property DateTime   $created_at     {@property-type field}
 * @property DateTime   $updated_at     {@property-type field}
 *
 * @action getItem  {@statuses-access guest|logged}
 * @action getItems {@statuses-access guest|logged}
 * @action create   {@statuses-access guest|logged}
 * @action update   {@statuses-access guest|logged}
 * @action delete   {@statuses-access guest|logged}
 */
class UserRole extends Model
{

    protected $fillable = [
        'user_id',
        'role_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldTypeEnum::UUID));
    }

    public static function getMetadata(): array
    {
        return ModelMetadataManager::getModelMetadata(static::class)->toArray();
    }

}
