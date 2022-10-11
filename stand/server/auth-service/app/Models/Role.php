<?php

namespace App\Models;

use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
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
        return ModelMetadata::make(Role::class, FieldMetadata::make('id', VariableType::STRING))
            ->addFields([
                FieldMetadata::make('name', VariableType::STRING)
                    ->required()
                    ->addValidationRule('unique:roles,name'),
                FieldMetadata::make('is_default', VariableType::BOOLEAN)
                    ->default(false),
                FieldMetadata::make('created_at', VariableType::DATETIME)
                    ->hidden()
                    ->guarded(),
                FieldMetadata::make('updated_at', VariableType::DATETIME)
                    ->hidden()
                    ->guarded(),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'permissions',
                    Permission::class,
                    RelationType::HAS_MANY
                ),
            ])
            ->addActions([
                ActionMetadata\CreateActionMetadata::make()
                    ->addParameters([
                        ActionParameterMetadata::make('name', VariableType::STRING)
                            ->required()
                            ->addValidationRule('unique:roles,name'),
                        ActionParameterMetadata::make('is_default', VariableType::BOOLEAN)
                            ->default(false),
                    ]),
                ActionMetadata\CreateManyActionMetadata::make(),
                ActionMetadata\UpdateActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadata\UpdateManyActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadata\UpdateManyRawActionMetadata::make(),
                ActionMetadata\DeleteActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadata\DeleteManyActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadata\DeleteManyRawActionMetadata::make(),
                ActionMetadata\GetItemsActionMetadata::make(),
                ActionMetadata\GetItemActionMetadata::make(static::class, VariableType::STRING),
                ActionMetadata\GetCountActionMetadata::make(),
                ActionMetadata\GetMetadataActionMetadata::make()
            ]);
    }

}
