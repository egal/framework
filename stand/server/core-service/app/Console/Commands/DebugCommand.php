<?php /** @noinspection PhpMissingFieldTypeInspection */

namespace App\Console\Commands;

use App\Models\Country;
use App\Models\Speaker;
use Illuminate\Console\Command;

class DebugCommand extends Command
{

    protected $signature = 'debug';

    public function handle(): void
    {
        $speaker_ids = Speaker::all(['id'])->toArray();
        foreach ($speaker_ids as $id) {
            dd(['speakers', $id['id']]);
        }
    }

}
