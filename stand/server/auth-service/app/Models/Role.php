<?php

namespace App\Models;

use App\Metadata\FieldMetadata;
use App\Metadata\FieldTypeEnum;
use App\Metadata\MetadataManager;
use App\Metadata\ModelMetadata;
use Egal\Model\Model;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Ramsey\Uuid\Uuid;

/**
 * @property string     $id            {@primary-key}          {@property-type field} {@validation-rules required|string|unique:role}
 * @property string     $name          {@property-type field}  {@validation-rules required|string|unique:permissions}
 * @property bool       $is_default    {@property-type field}  {@validation-rules bool}
 * @property DateTime   $created_at    {@property-type field}
 * @property DateTime   $updated_at    {@property-type field}
 *
 * @property Permission[] $permissions {@property-type relation}
 *
 * @action getItem  {@statuses-access guest|logged}
 * @action getItems {@statuses-access guest|logged}
 * @action create   {@statuses-access guest|logged}
 * @action update   {@statuses-access guest|logged}
 * @action delete   {@statuses-access guest|logged}
 */
class Role extends Model
{

    use HasFactory;

    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'is_default'
    ];

    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected static function boot()
    {
        parent::boot();
        static::created(function (Role $role) {
            $defaultPermissions = Permission::query()
                ->where('is_default', true)
                ->get();
            $role->permissions()
                ->attach($defaultPermissions->pluck('id'));
        });
        static::created(function (Role $role) {
            if ($role->is_default) {
                User::all()->each(function (User $user) use ($role) {
                    $user->roles()->attach($role->id);
                });
            }
        });
    }

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'role_permissions');
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', Uuid::class,FieldTypeEnum::KEY));
    }

    public static function getMetadata(): array
    {
        return MetadataManager::getModelMetadata(static::class)->toArray();
    }
}
