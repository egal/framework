<?php

namespace App\Models;

use App\Exceptions\EmptyPasswordException;
use App\Exceptions\PasswordHashException;
use Egal\Auth\Tokens\UserMasterRefreshToken;
use Egal\Auth\Tokens\UserMasterToken;
use Egal\AuthServiceDependencies\Exceptions\LoginException;
use Egal\AuthServiceDependencies\Models\User as BaseUser;
use Egal\Model\Enums\FieldType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Traits\UsesUuidKey;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class User extends BaseUser
{

    use UsesUuidKey;
    use HasFactory;
    use HasRelationships;

    protected $hidden = [
        'password',
    ];

    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    public static function actionRegister(string $email, string $password): User
    {
        if (!$password) {
            throw new EmptyPasswordException();
        }

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
        $user = self::query()
            ->where('email', '=', $email)
            ->first();

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

    protected static function boot()
    {
        parent::boot();
        static::created(function (User $user) {
            $defaultRoles = Role::query()
                ->where('is_default', true)
                ->get();
            $user->roles()
                ->attach($defaultRoles->pluck('id'));
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
        return ModelMetadata::make(User::class, FieldMetadata::make('id',FieldType::UUID))
            ->addFields([
                FieldMetadata::make('email', FieldType::STRING)
                    ->required()
                    ->string()
                    ->addValidationRule('unique:users,email')
                ,
                FieldMetadata::make('password', FieldType::INTEGER)
                    ->required()
                    ->string()
                ,
                FieldMetadata::make('created_at', FieldType::DATETIME),
                FieldMetadata::make('updated_at', FieldType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'userRoles',
                    RelationType::BELONGS_TO_MANY,
                    fn() => (new User)->belongsToMany(Role::class, 'user_roles'),
                ),
                RelationMetadata::make(
                    'permissions',
                    RelationType::HAS_MANY_DEEP,
                    fn() => (new User)->hasManyDeep(
                        Permission::class,
                        [UserRole::class, Role::class, RolePermission::class],
                        ['user_id', 'id', 'role_id', 'id'],
                        ['id', 'role_id', 'id', 'permission_id']
                    )
                ),
            ])
            ->addActions([
                ActionMetadata::make('register'),
                ActionMetadata::make('login'),
                ActionMetadata::make('loginToService'),
                ActionMetadata::make('refreshUserMasterToken'),
                ActionMetadata::make('getItems'),
            ]);
    }

}
