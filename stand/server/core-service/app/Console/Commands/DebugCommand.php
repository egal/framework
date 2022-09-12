<?php /** @noinspection PhpMissingFieldTypeInspection */

namespace App\Console\Commands;

use App\Models\Country;
use Illuminate\Console\Command;

class DebugCommand extends Command
{

    protected $signature = 'debug';

    public function handle(): void
    {
        $country = new Country();
        $country->setAttribute('name', 'new_school');
        $country->save();
        $country->getModelMetadata();
    }

}
