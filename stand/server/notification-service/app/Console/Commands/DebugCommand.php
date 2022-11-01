<?php /** @noinspection PhpMissingFieldTypeInspection */

namespace App\Console\Commands;

use App\Helpers\TestMail;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class DebugCommand extends Command
{

    protected $signature = 'debug';

    public function handle(): void
    {
        Mail::to('lebedev@sputnikfund.ru')->send(new TestMail());
    }

}
