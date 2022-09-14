<?php

namespace Database\Seeders\Runner;

use App\Models\Speaker;
use Database\Seeders\Data\SpeakersData;

class SpeakersSeeder extends BaseSeederClass
{
    public function __construct()
    {
        $this->dataProvider = new SpeakersData();
        $this->model = new Speaker();
    }

}
