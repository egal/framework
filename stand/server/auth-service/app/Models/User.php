<?php

namespace App\Models;

use App\Exceptions\PasswordHashException;
use App\Policies\ModelPolicy;
use App\Policies\UserPolicy;
use Egal\Auth\Exceptions\NoAccessForActionException;
use Egal\Auth\Tokens\UserMasterRefreshToken;
use Egal\Auth\Tokens\UserMasterToken;
use Egal\AuthServiceDependencies\Exceptions\LoginException;
use Egal\AuthServiceDependencies\Models\User as BaseUser;
use Egal\Core\Session\Session;
use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
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

    /**
     * @throws PasswordHashException
     * @throws NoAccessForActionException
     */
    public static function actionRegister(string $email, string $password): User
    {
        Session::getAuthEntity()->mayOrFail('registering', User::class);
        $user = new static();
        $user->setAttribute('email', $email);
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        if (!$hashedPassword) {
            throw new PasswordHashException();
        }

        $user->setAttribute('password', $hashedPassword);
        $user->save();

        return $user;
    }

    public static function actionLogin(string $email, string $password): array
    {
        /** @var BaseUser $user */
        $user = self::query()->where('email', '=', $email)->first();

        if (!$user || !password_verify($password, $user->getAttribute('password'))) {
            throw new LoginException('Incorrect Email or password!');
        }

        $umt = new UserMasterToken();
        $umt->setSigningKey(config('app.service_key'));
        $umt->setAuthIdentification($user->getAuthIdentifier());

        $umrt = new UserMasterRefreshToken();
        $umrt->setSigningKey(config('app.service_key'));
        $umrt->setAuthIdentification($user->getAuthIdentifier());

        return [
            'user_master_token' => $umt->generateJWT(),
            'user_master_refresh_token' => $umrt->generateJWT()
        ];
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

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(User::class, FieldMetadata::make('id', VariableType::UUID))
            ->addPolicies([
                UserPolicy::class,
                ModelPolicy::class,
            ])
            ->addFields([
                FieldMetadata::make('email', VariableType::STRING)
                    ->required()
                    ->addValidationRule('unique:users,email'),
                FieldMetadata::make('password', VariableType::STRING)
                    ->required()
                    ->hidden()
                    ->guarded(),
                FieldMetadata::make('created_at', VariableType::DATETIME),
                FieldMetadata::make('updated_at', VariableType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'roles',
                    Role::class,
                    RelationType::HAS_MANY,
                ),
            ])
            ->addActions([
                ActionMetadata::make('register')->addParameters(
                    [
                        ActionParameterMetadata::make('password', VariableType::STRING)
                            ->required(),
                        ActionParameterMetadata::make('email', VariableType::STRING)
                            ->required()
                            ->addValidationRule('email:rfc,dns')
                    ]
                ),
                ActionMetadata::make('login')->addParameters(
                    [
                        ActionParameterMetadata::make('email', VariableType::STRING)
                            ->required()
                            ->addValidationRule('exists:users,email'),
                    ]
                ),
                ActionMetadata::make('loginToService'),
                ActionMetadata::make('refreshUserMasterToken'),
                ActionMetadata::make('create'),
                ActionMetadata::make('update')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:users,id')
                    ]),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems')
                    ->addParameters([
                        ActionParameterMetadata::make('pagination', VariableType::ARRAY)
                            ->nullable(),
                        ActionParameterMetadata::make('relations', VariableType::ARRAY)
                            ->nullable(),
                        ActionParameterMetadata::make('filter', VariableType::ARRAY)
                            ->nullable(),
                        ActionParameterMetadata::make('order', VariableType::ARRAY)
                            ->nullable(),
                    ]),
                ActionMetadata::make('delete')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:users,id')
                    ]),
                ActionMetadata::make('getItem')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:users,id')
                    ]),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
