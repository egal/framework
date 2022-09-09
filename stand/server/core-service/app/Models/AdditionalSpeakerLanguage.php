<?php

namespace App\Models;

use Egal\Model\Model;

class AdditionalSpeakerLanguage extends Model
{
    protected $table = 'additional_speaker_languages';

    protected $fillable = [
        'language_id',
        'speaker_id'
    ];
}
