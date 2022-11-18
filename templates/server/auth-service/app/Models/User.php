<?php

namespace App\Models;

use App\Exceptions\PasswordHashException;
use App\Policies\UserPolicy;
use Egal\AuthServiceDependencies\Exceptions\LoginException;
use Egal\AuthServiceDependencies\Models\User as BaseUser;
use Egal\Core\Session\Session;
use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Staudenmeir\EloquentHasManyDeep\HasManyDeep;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class User extends BaseUser
{

    use HasFactory;
    use HasRelationships;

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(User::class, FieldMetadata::make('id', VariableType::UUID))
            ->policy(UserPolicy::class)
            ->addFields([
                FieldMetadata::make('email', VariableType::STRING)
                    ->required()
                    ->addValidationRule('unique:users,email'),
                FieldMetadata::make('password', VariableType::STRING)
                    ->required()
                    ->hidden()
                    ->guarded(),
                FieldMetadata::make('created_at', VariableType::DATE),
                FieldMetadata::make('updated_at', VariableType::DATE),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'roles',
                    Role::class,
                    RelationType::HAS_MANY,
                ),
            ])
            ->addActions([
                ActionMetadata::make('register')
                    ->addParameters([
                        ActionParameterMetadata::make('password', VariableType::STRING)
                            ->required(),
                        ActionParameterMetadata::make('email', VariableType::STRING)
                            ->required()
                    ]),
                ActionMetadata::make('login')
                    ->addParameters([
                        ActionParameterMetadata::make('email', VariableType::STRING)
                            ->required(),
                        ActionParameterMetadata::make('password', VariableType::STRING)
                            ->required()
                    ]),
                ActionMetadata::make('loginToService')
                    ->addParameters([
                        ActionParameterMetadata::make('token', VariableType::STRING)
                            ->required(),
                        ActionParameterMetadata::make('service_name', VariableType::STRING)
                            ->required(),
                    ]),
                ActionMetadata::make('refreshUserMasterToken'),
                ActionMetadataBlanks::getMetadata(),
                ActionMetadataBlanks::getItem(VariableType::STRING),
                ActionMetadataBlanks::getItems(),
                ActionMetadataBlanks::create(),
                ActionMetadataBlanks::update(VariableType::STRING),
                ActionMetadataBlanks::delete(VariableType::STRING),
            ]);
    }

    public static function actionRegister(string $email, string $password): User
    {
        $user = new static();
        $user->setAttribute('email', $email);
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        if (!$hashedPassword) throw new PasswordHashException();

        $user->setAttribute('password', $hashedPassword);
        Session::client()->mayOrFail('register', $user);
        $user->save();

        return $user;
    }

    public static function actionLogin(string $email, string $password): array
    {
        /** @var BaseUser $user */
        $user = static::query()->where('email', '=', $email)->first();

        if (!$user || !password_verify($password, $user->getAttribute('password'))) {
            throw new LoginException('Incorrect Email or password!');
        }

        Session::client()->mayOrFail('login', $user);

        return $user->generateLoginResult();
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    public function permissions(): HasManyDeep
    {
        return $this->hasManyDeep(
            Permission::class,
            [UserRole::class, Role::class, RolePermission::class],
            ['user_id', 'id', 'role_id', 'id'],
            ['id', 'role_id', 'id', 'permission_id']
        );
    }

    protected static function boot()
    {
        parent::boot();
        static::created(function (User $user) {
            $defaultRoles = Role::query()->where('is_default', true)->get();
            $user->roles()->attach($defaultRoles->pluck('id'));
        });
    }

    protected function getRoles(): array
    {
        return array_unique($this->roles->pluck('id')->toArray());
    }

    protected function getPermissions(): array
    {
        return array_unique($this->permissions->pluck('id')->toArray());
    }

}
