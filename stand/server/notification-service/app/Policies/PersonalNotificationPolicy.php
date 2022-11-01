<?php

namespace App\Policies;
use App\Models\PersonalNotification;
use Egal\Auth\Entities\Client;

class PersonalNotificationPolicy
{
    public static function retrieving(Client $client, PersonalNotification $notification)
    {
        if (is_null($notification->getAttribute('user_id'))) {
            return true;
        }
        return $client->getSub()['id'] === $notification->getAttribute('user_id');
    }

    public static function retrieved(Client $client, PersonalNotification $notification)
    {
        return true;
    }

    public static function retrievingMetadata(Client $client, PersonalNotification $notification)
    {
        if (is_null($notification->getAttribute('user_id'))) {
            return true;
        }
        return $client->getSub()['id'] === $notification->getAttribute('user_id');
    }

    public static function retrievedMetadata(Client $client, PersonalNotification $notification)
    {
        return true;
    }

    public static function retrievingCount(Client $client, PersonalNotification $notification)
    {
        return $client->getSub()['id'] === $notification->getAttribute('user_id');

    }

    public static function retrievedCount(Client $client, PersonalNotification $notification)
    {
        return true;
    }

    public static function creating(Client $client, PersonalNotification $notification)
    {
        return $client->isService();
    }

    public static function created(Client $client, PersonalNotification $notification)
    {
        return true;
    }

    public static function updating(Client $client, PersonalNotification $notification)
    {
        return $client->isService() || $client->isUser() && $notification->getDirty() === ['checked'];
    }

    public static function updated(Client $client, PersonalNotification $notification)
    {
        return true;
    }

    public static function deleting(Client $client, PersonalNotification $notification)
    {
        return false;
    }

    public static function deleted(Client $client, PersonalNotification $notification)
    {
        return false;
    }
}
