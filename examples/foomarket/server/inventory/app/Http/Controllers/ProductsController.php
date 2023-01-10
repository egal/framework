<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Orion\Concerns\DisableAuthorization;
use Orion\Http\Controllers\Controller as OrionController;

class ProductsController extends OrionController
{

    use DisableAuthorization;

    protected $model = Product::class;

}
