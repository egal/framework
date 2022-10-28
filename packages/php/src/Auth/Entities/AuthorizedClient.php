<?php

namespace Egal\Auth\Entities;

use Egal\Auth\Tokens\ServiceToken;

abstract class AuthorizedClient extends Client
{

    public array $roles;

    public array $permissions;

    public array $sub;

    public function __construct(ServiceToken $ust)
    {
        $this->roles = $ust->getRoles();
        $this->permissions = $ust->getPermissions();
        $this->sub = $ust->getSub();
    }

    public function hasRole(string $role): bool
    {
        return in_array($role, $this->getRoles());
    }

    /**
     * @param string[] $roles
     */
    public function hasRoles(array $roles): bool
    {
        return !array_diff($roles, $this->getRoles());
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function getPermissions(): array
    {
        return $this->permissions;
    }

    public function getSub(): array
    {
        return $this->sub;
    }

}
