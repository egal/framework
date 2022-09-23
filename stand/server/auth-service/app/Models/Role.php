<?php

namespace App\Models;

use Egal\Model\Enums\AttributeType;
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
        return ModelMetadata::make(Role::class, FieldMetadata::make('id', AttributeType::STRING))
            ->addFields([
                FieldMetadata::make('name', AttributeType::STRING)
                    ->required()
                    ->addValidationRule('unique:roles,name'),
                FieldMetadata::make('is_default', AttributeType::BOOLEAN)
                    ->required(),
                FieldMetadata::make('created_at', AttributeType::DATETIME)
                    ->hidden()
                    ->guarded(),
                FieldMetadata::make('updated_at', AttributeType::DATETIME)
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
                ActionMetadata::make('create'),
                ActionMetadata::make('update')
                    ->addParameters([
                        ActionParameterMetadata::make('id', AttributeType::STRING)
                            ->required()
                            ->addValidationRule('exists:roles,id')
                    ]),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('delete')
                    ->addParameters([
                        ActionParameterMetadata::make('id', AttributeType::STRING)
                            ->required()
                            ->addValidationRule('exists:roles,id')
                    ]),
                ActionMetadata::make('getItem')
                    ->addParameters([
                        ActionParameterMetadata::make('id', AttributeType::STRING)
                            ->required()
                            ->addValidationRule('exists:roles,id')
                    ]),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
