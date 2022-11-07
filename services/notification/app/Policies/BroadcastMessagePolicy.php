<?php

namespace App\Policies;

use App\Models\BroadcastMessage;
use Egal\Auth\Entities\Client;

class BroadcastMessagePolicy
{

    public static function retrievingMetadata(Client $client, BroadcastMessage $message): bool
    {
        return true;
    }

    public static function retrievedMetadata(Client $client, BroadcastMessage $message): bool
    {
        return true;
    }

    public static function retrieving(): bool
    {
        return true;
    }

    public static function retrieved(): bool
    {
        return true;
    }

    public static function creating(Client $client, BroadcastMessage $message): bool
    {

        return $client->isService() || static::isUserAccess($client);
    }

    public static function created(Client $client, BroadcastMessage $message): bool
    {
        return true;
    }

    public static function updating(Client $client, BroadcastMessage $message): bool
    {
        return $client->isService() || static::isUserAccess($client);
    }

    public static function updated(Client $client, BroadcastMessage $message): bool
    {
        return true;
    }

    protected static function isUserAccess(Client $client): bool
    {
        $roles = env('BROADCAST_MESSAGE_POLICY_CREATE_UPDATE_USER_ROLES_ACCESS', ['administrator']);
        $forceAccess = $roles === '*';
        $roles = explode(',', $roles);

        return $client->isUser() && ($forceAccess || $client->hasRoles($roles));
    }

}
