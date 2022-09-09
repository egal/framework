<?php

namespace App\Models;

use Egal\Model\Model;

class Country extends Model
{
    protected $keyType = 'string';

    protected $table = 'countries';

    protected $fillable = [
        'name'
    ];
}
