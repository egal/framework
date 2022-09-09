<?php

namespace App\Models;

use Egal\Model\Model;
use Egal\Model\Traits\UsesUuidKey;

class School extends Model
{
    use UsesUuidKey;

    protected $table = 'schools';

    protected $fillable = [
        'name',
        'avatar'
    ];
}
