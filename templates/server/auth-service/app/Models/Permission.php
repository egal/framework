<?php

namespace App\Models;

use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\ActionParameterMetadata;
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
        return ModelMetadata::make(Permission::class, FieldMetadata::make('id', VariableType::STRING))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('name', VariableType::STRING)
                    ->required()
                    ->addValidationRule('unique:roles,name'),
                FieldMetadata::make('is_default', VariableType::BOOLEAN)
                    ->required(),
                FieldMetadata::make('created_at', VariableType::DATE)
                    ->guarded()
                    ->hidden(),
                FieldMetadata::make('updated_at', VariableType::DATE)
                    ->guarded()
                    ->hidden(),
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
