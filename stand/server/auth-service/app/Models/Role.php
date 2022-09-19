<?php

namespace App\Models;

use Egal\Model\Enums\FieldType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{

    use HasFactory;

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
        return ModelMetadata::make(Role::class, FieldMetadata::make('id', FieldType::STRING)->fillable())
            ->addFields([
                FieldMetadata::make('name', FieldType::STRING)
                    ->required()
                    ->string()
                    ->fillable()
                    ->addValidationRule('unique:roles,name'),
                FieldMetadata::make('is_default', FieldType::BOOLEAN)
                    ->required()
                    ->boolean()
                    ->fillable(),
                FieldMetadata::make('created_at', FieldType::DATETIME)
                    ->hidden()
                    ->guarded(),
                FieldMetadata::make('updated_at', FieldType::DATETIME)
                    ->hidden()
                    ->guarded(),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'permissions',
                    RelationType::HAS_MANY
                ),
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
