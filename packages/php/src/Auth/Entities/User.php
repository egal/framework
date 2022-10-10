<?php

namespace Egal\AuthServiceDependencies\Entities;

use Egal\Auth\Tokens\UserServiceToken;

class User extends AuthEntity
{
    public readonly string $id;

    public readonly array $roles;

    public readonly array $permissions;

    public readonly array $authInformation;

    public function __construct(UserServiceToken $ust)
    {
        $this->id = $ust->getUid();
        $this->roles = $ust->getRoles();
        $this->permissions = $ust->getPermissions();
        $this->authInformation = $ust->getAuthInformation();
    }

}
