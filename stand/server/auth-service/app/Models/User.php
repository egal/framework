<?php

namespace App\Models;

use App\Exceptions\PasswordHashException;
use App\Policies\UserPolicy;
use Egal\Auth\Tokens\UserMasterRefreshToken;
use Egal\Auth\Tokens\UserMasterToken;
use Egal\AuthServiceDependencies\Exceptions\LoginException;
use Egal\AuthServiceDependencies\Models\User as BaseUser;
use Egal\Core\Session\Session;
use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies\CreateActionMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies\CreateManyActionMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies\DeleteActionMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies\DeleteManyActionMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies\DeleteManyRawActionMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies\GetCountActionMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies\GetItemActionMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies\GetItemsActionMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies\GetMetadataActionMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies\UpdateActionMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies\UpdateManyActionMetadata;
use Egal\Model\Metadata\ActionMetadataDependencies\UpdateManyRawActionMetadata;
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
     */
    public static function actionRegister(string $email, string $password): User
    {
        Session::getAuthEntity()->mayOrFail(static::class, 'register');

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
        Session::getAuthEntity()->mayOrFail(static::class, 'login');

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
                ActionMetadata::make('register')
                    ->addParameters([
                        ActionParameterMetadata::make('password', VariableType::STRING)
                            ->required(),
                        ActionParameterMetadata::make('email', VariableType::STRING)
                            ->required()
                            ->addValidationRule('email:rfc,dns')
                    ]),
                ActionMetadata::make('login')
                    ->addParameters([
                        ActionParameterMetadata::make('email', VariableType::STRING)
                            ->required()
                            ->addValidationRule('exists:users,email'),
                    ]),
                ActionMetadata::make('loginToService'),
                ActionMetadata::make('refreshUserMasterToken'),
                CreateActionMetadata::make()
                    ->addParameters([
                        ActionParameterMetadata::make('email', VariableType::STRING)
                            ->required()
                            ->addValidationRule('unique:users,email'),
                        ActionParameterMetadata::make('password', VariableType::STRING)
                            ->required()
                    ]),
                CreateManyActionMetadata::make(),
                UpdateActionMetadata::make(static::class, VariableType::UUID),
                UpdateManyActionMetadata::make(static::class, VariableType::UUID),
                UpdateManyRawActionMetadata::make(),
                DeleteActionMetadata::make(static::class, VariableType::UUID),
                DeleteManyActionMetadata::make(static::class, VariableType::UUID),
                DeleteManyRawActionMetadata::make(),
                GetItemsActionMetadata::make(),
                GetItemActionMetadata::make(static::class, VariableType::UUID),
                GetCountActionMetadata::make(),
                GetMetadataActionMetadata::make()
            ]);
    }

}
