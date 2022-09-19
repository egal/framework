<?php

namespace Database\Seeders\Runner;

use App\Models\Lesson;
use App\Models\School;
use App\Models\Speaker;
use Database\Seeders\Data\LessonsData;
use Database\Seeders\RelationClass;

class LessonsSeeder extends BaseSeederClass
{
    public function __construct()
    {
        $this->dataProvider = new LessonsData();
        $this->model = new Lesson();
        $this->relations = [
            new RelationClass(new Speaker(), 'speaker_id', 'speaker_data'),
            new RelationClass(new School(), 'school_id', 'school_data')
        ];
    }

}
