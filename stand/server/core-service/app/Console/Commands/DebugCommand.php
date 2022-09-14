<?php /** @noinspection PhpMissingFieldTypeInspection */

namespace App\Console\Commands;

use App\Models\Country;
use Illuminate\Console\Command;

class DebugCommand extends Command
{

    protected $signature = 'debug';

    public function handle(): void
    {
        $model = new Country();
        $model->setAttribute('name', 'AmericaCountry');
        $model->setAttribute('id', 'USA');
        $model->save();
        $metadata = $model->getModelMetadata();
        var_dump($metadata);
    }

}
