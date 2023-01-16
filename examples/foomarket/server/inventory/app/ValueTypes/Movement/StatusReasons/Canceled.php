<?php
declare(strict_types=1);

namespace App\ValueTypes\Movement\StatusReasons;

enum Canceled: string
{

    case NotEnoughProductsCountInStock = 'not_enough_products_count_in_stock';

}
