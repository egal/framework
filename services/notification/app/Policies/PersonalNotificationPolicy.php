<?php

namespace App\Policies;

use App\Models\PersonalNotification;
use Egal\Auth\Entities\Client;

class PersonalNotificationPolicy
{

    public static function retrievingMetadata(Client $client, PersonalNotification $notification): bool
    {
        return true;
    }

    public static function retrievedMetadata(Client $client, PersonalNotification $notification): bool
    {
        return true;
    }

    public static function retrieving(Client $client, PersonalNotification $notification): bool
    {
        return $client->isUser() && $client->getSub()['key'] === $notification->getAttribute('user_key');
    }

    public static function retrieved(Client $client, PersonalNotification $notification): bool
    {
        return true;
    }

    public static function creating(Client $client, PersonalNotification $notification): bool
    {
        return $client->isService();
    }

    public static function created(Client $client, PersonalNotification $notification): bool
    {
        return true;
    }

    public static function updating(Client $client, PersonalNotification $notification): bool
    {
        return $client->isUser() && $notification->getDirty() === ['checked'];
    }

    public static function updated(Client $client, PersonalNotification $notification): bool
    {
        return true;
    }

}
