<?php /** @noinspection PhpMissingFieldTypeInspection */

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class DebugCommand extends Command
{

    protected $signature = 'debug';

    public function handle(): void
    {
        $model = new User();
        $relation =
        $relationName = camel_case('role');
        dump($model->$relationName()->getQuery()->getModel()->getModelMetadata());
    }

}
