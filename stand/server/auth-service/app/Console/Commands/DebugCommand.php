<?php /** @noinspection PhpMissingFieldTypeInspection */

namespace App\Console\Commands;

use App\Models\Employee;
use Egal\Model\Facades\ModelMetadataManager;
use Illuminate\Console\Command;

class DebugCommand extends Command
{

    protected $signature = 'debug';

    public function handle(): void
    {
        var_dump(array_key_exists('first', ModelMetadataManager::getModelMetadata(Employee::class)->getRelations()));
    }

}
