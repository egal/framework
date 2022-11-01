<?php

namespace App\Providers;
use App\Listeners\OnRegistrationSendMailListener;

class MailServiceProvider extends \Egal\Core\Events\EventServiceProvider
{
    protected $listen = [
        \OnRegistrationSendEmailEvent::class => [
            OnRegistrationSendMailListener::class
        ]
    ];
}
