<?php

namespace App\Models;

use Egal\Model\Model;

class Language extends Model
{
    protected $keyType = 'string';

    protected $table = 'languages';

    protected $fillable = [
        'name'
    ];
}
