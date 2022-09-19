<?php

namespace Database\Seeders\Runner;

use App\Models\AdditionalSpeakerLanguage;
use App\Models\Speaker;
use Database\Seeders\Data\AdditionalSpeakerLanguagesData;
use Database\Seeders\RelationClass;

class AdditionalSpeakerLanguagesSeeder extends BaseSeederClass
{
    public function __construct()
    {
        $this->dataProvider = new AdditionalSpeakerLanguagesData();
        $this->model = new AdditionalSpeakerLanguage();
        $this->relations = [
            new RelationClass(new Speaker(), 'speaker_id', 'speaker_data')
        ];
    }
}
