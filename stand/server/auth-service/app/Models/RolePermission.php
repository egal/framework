<?php

namespace App\Models;

use App\Metadata\FieldMetadata;
use App\Metadata\FieldTypeEnum;
use App\Metadata\MetadataManager;
use App\Metadata\ModelMetadata;
use Egal\Model\Model;
use DateTime;
use Ramsey\Uuid\Uuid;

/**
 * @property int        $id                {@primary-key}          {@property-type field}
 * @property string     $role_id           {@property-type field}  {@validation-rules required|string}
 * @property string     $permission_id     {@property-type field}  {@validation-rules required|string}
 * @property DateTime   $created_at        {@property-type field}
 * @property DateTime   $updated_at        {@property-type field}
 *
 * @action getItem  {@statuses-access guest|logged}
 * @action getItems {@statuses-access guest|logged}
 * @action create   {@statuses-access guest|logged}
 * @action update   {@statuses-access guest|logged}
 * @action delete   {@statuses-access guest|logged}
 */
class RolePermission extends Model
{

    protected $fillable = [
        'role_id',
        'permission_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', Uuid::class,FieldTypeEnum::KEY));
    }

    public static function getMetadata(): array
    {
        return MetadataManager::getModelMetadata(static::class)->toArray();
    }

}
