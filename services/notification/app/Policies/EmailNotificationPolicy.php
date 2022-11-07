<?php

namespace App\Policies;

use App\Models\EmailNotification;
use Egal\Auth\Entities\Client;

class EmailNotificationPolicy
{

    public static function retrievingMetadata(Client $client, EmailNotification $emailNotification): bool
    {
        return true;
    }

    public static function retrievedMetadata(Client $client, EmailNotification $emailNotification): bool
    {
        return true;
    }

    public static function creating(Client $client, EmailNotification $emailNotification): bool
    {
        return $client->isService();
    }

    public static function created(Client $client, EmailNotification $emailNotification): bool
    {
        return true;
    }

}
