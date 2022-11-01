<?php

namespace App\Providers;


use App\Listeners\OnRegistrationSendMailListener;

class EventServiceProvider extends \Egal\Core\Events\EventServiceProvider
{
    protected $listen = [
          \OnRegistrationSendEmailEvent::class => [
              OnRegistrationSendMailListener::class
          ]
    ];
}
