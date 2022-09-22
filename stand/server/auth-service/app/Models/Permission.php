<?php

namespace App\Models;

use Egal\Model\Enums\AttributeType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Permission extends Model
{

    use HasFactory;

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
        return ModelMetadata::make(Permission::class, FieldMetadata::make('id',AttributeType::STRING)->fillable())
            ->addFields([
                FieldMetadata::make('name', AttributeType::STRING)
                    ->required()
                    ->fillable()
                    ->addValidationRule('unique:roles,name'),
                FieldMetadata::make('is_default', AttributeType::BOOLEAN)
                    ->required()
                    ->fillable(),
                FieldMetadata::make('created_at', AttributeType::DATETIME)
                    ->guarded()
                    ->hidden(),
                FieldMetadata::make('updated_at', AttributeType::DATETIME)
                    ->guarded()
                    ->hidden(),
            ])
            ->addActions([
                ActionMetadata::make('getItem'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('create'),
                ActionMetadata::make('update'),
                ActionMetadata::make('delete'),
            ]);
    }

}
