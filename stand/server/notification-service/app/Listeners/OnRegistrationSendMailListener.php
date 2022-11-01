<?php
namespace App\Listeners;
use Illuminate\Support\Facades\Mail;
use OnRegistrationSendEmailEvent;
class OnRegistrationSendMailListener
{
    public function handle(OnRegistrationSendEmailEvent $emailEvent)
    {
        Mail::send(1, ['name' => 'da'], function ($message) {
           $message->to('lebedev@sputnikfund.ru', 'name')->subject('dsada');
        });
    }
}
