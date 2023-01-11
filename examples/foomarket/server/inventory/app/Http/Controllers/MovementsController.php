<?php

namespace App\Http\Controllers;

use App\Models\Movement;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller as OrionController;

class MovementsController extends OrionController
{

    use DisableAuthorization;

    protected $model = Movement::class;

    public function includes(): array
    {
        return [
            'product',
        ];
    }

}
