<?php /** @noinspection PhpMissingFieldTypeInspection */

namespace App\Console\Commands;

use App\Models\Country;
use App\Models\Speaker;
use Egal\Core\ActionCaller\ActionCaller;
use Egal\Core\Exceptions\ActionCallException;
use Egal\Model\Exceptions\NoValidActionParametersException;
use Illuminate\Console\Command;

class DebugCommand extends Command
{

    protected $signature = 'debug';

    /**
     * @throws \ReflectionException
     * @throws ActionCallException
     * @throws NoValidActionParametersException
     */
    public function handle(): void
    {
        //$country = new Country();
        $actionCaller = new ActionCaller('Country', 'create', ['name'=>'1']);
        var_dump($actionCaller->getValidActionParameters());
    }

}
