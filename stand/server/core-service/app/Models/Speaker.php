<?php

namespace App\Models;

use Egal\Model\Model as EgalModel;
use Egal\Model\Traits\UsesUuidKey;

class Speaker extends EgalModel
{
    use UsesUuidKey;

    protected $table = 'speakers';

    protected $fillable = [
        'user_id',
        'name',
        'surname',
        'country_id',
        'avatar',
        'video'
    ];

    protected $hidden = [
        'user_id'
    ];

    protected $guarded = [
        'user_id'
    ];
}
