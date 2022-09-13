<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @action getItem  {@statuses-access guest|logged}
 * @action getItems {@statuses-access guest|logged}
 * @action create   {@statuses-access guest|logged}
 * @action update   {@statuses-access guest|logged}
 * @action delete   {@statuses-access guest|logged}
 */
class Permission extends Model
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
        static::created(function (Permission $permission) {
            if ($permission->is_default) {
                Role::all()->each(function (Role $role) use ($permission) {
                    $role->permissions()->attach($permission->id);
                });
            }
        });
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(Permission::class, FieldMetadata::make('id',FieldTypeEnum::STRING))
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
            ->addActions([
                'getItem',
                'getItems',
                'create',
                'update',
                'delete'
            ]);
    }

}
