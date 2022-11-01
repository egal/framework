<?php
use Egal\Core\Events\Event;
use App\Models\EmailNotification;
class OnRegistrationSendEmailEvent extends Event
{
    public function __construct(EmailNotification $emailNotification)
    {
        $this->emailNotification = $emailNotification;
    }
}
