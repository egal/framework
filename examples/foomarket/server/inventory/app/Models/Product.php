<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
* Table: products
*
* === Columns ===
* @property int $id
* @property string $name
* @property int $stock_count
* @property \Carbon\Carbon|null $created_at
* @property \Carbon\Carbon|null $updated_at
*/
class Product extends Model
{

    protected $fillable = ['name'];

}
