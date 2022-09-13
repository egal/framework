<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Enums\RelationTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
        return ModelMetadata::make(Role::class, FieldMetadata::make('id', FieldTypeEnum::STRING))
            ->addFields([
                FieldMetadata::make('name', FieldTypeEnum::STRING)
                    ->required()
                    ->string()
                    ->addValidationRule('unique:roles,name')
                ,
                FieldMetadata::make('is_default', FieldTypeEnum::BOOLEAN)
                    ->required()
                    ->boolean()
                ,
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME)
            ])
            ->addRelations([
                RelationMetadata::make(
                    'permissions',
                    RelationTypeEnum::HAS_MANY,
                    fn(Role $role) => $role->hasMany(Permission::class, 'role_id', 'id')
                )
            ])
            ->addActions([
                'getItem',
                'getItems',
                'create',
                'update',
                'delete'
            ]);
    }

}
