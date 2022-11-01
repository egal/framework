<?php
use Egal\Core\Events\Event;
class OnRegistrationSendEmailEvent extends Event
{
    public function __construct(\App\Models\BroadcastMessage $emailNotification)
    {
        $this->emailNotification = $emailNotification;
    }
}
