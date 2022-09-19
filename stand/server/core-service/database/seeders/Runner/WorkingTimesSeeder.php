<?php

namespace Database\Seeders\Runner;

use App\Models\Speaker;
use App\Models\WorkingTime;
use Database\Seeders\Data\WorkingTimesData;
use Database\Seeders\RelationClass;

class WorkingTimesSeeder extends BaseSeederClass
{
    public function __construct()
    {
        $this->dataProvider = new WorkingTimesData();
        $this->model = new WorkingTime();
        $this->relations = [
            new RelationClass(new Speaker(), 'speaker_id', 'speaker_data')
        ];
    }
}
