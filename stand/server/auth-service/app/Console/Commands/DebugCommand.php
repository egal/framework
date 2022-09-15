<?php /** @noinspection PhpMissingFieldTypeInspection */

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class DebugCommand extends Command
{

    protected $signature = 'debug';

    public function handle(): void
    {
        /** @var User $model */
        $model = User::with(['userRoles', 'permissions'])->findOrFail('81a62286-e249-310b-ba52-59fab24a4996');
        dump(json_encode($model->toArray()['user_roles']));
    }

}
