<?php
namespace App\Listeners;
use Illuminate\Support\Facades\Mail;
use OnRegistrationSendEmailEvent;
class OnRegistrationSendMailListener
{
    public function handle(OnRegistrationSendEmailEvent $emailEvent)
    {
        $emailEvent->emailNotification->setAttribute('body','justBody');
    }
}
