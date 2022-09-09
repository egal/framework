<?php

namespace App\Models;

use Egal\Model\Model;
use Egal\Model\Traits\UsesUuidKey;

class Student extends Model
{
    use UsesUuidKey;

    protected $table = 'students';

    protected $fillable = [
        'name',
        'surname',
        'school_id'
    ];

    protected $hidden = [
        'user_id'
    ];

    protected $guarded = [
        'user_id'
    ];
}
