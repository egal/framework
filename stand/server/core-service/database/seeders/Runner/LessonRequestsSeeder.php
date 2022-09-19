<?php

namespace Database\Seeders\Runner;

use App\Models\LessonRequest;
use App\Models\School;
use App\Models\Speaker;
use Database\Seeders\Data\LessonRequestsData;
use Database\Seeders\RelationClass;

class LessonRequestsSeeder extends BaseSeederClass
{
    public function __construct()
    {
        $this->dataProvider = new LessonRequestsData();
        $this->model = new LessonRequest();
        $this->relations = [
            new RelationClass(new Speaker(), 'speaker_id', 'speaker_data'),
            new RelationClass(new School(), 'school_id', 'school_data')
        ];
    }

}
