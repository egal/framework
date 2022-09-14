<?php

namespace Database\Seeders\Runner;

use App\Models\School;
use App\Models\Student;
use Database\Seeders\Data\StudentsData;
use Database\Seeders\RelationClass;

class StudentsSeeder extends BaseSeederClass
{
    public function __construct()
    {
        $this->dataProvider = new StudentsData();
        $this->model = new Student();
        $this->relations = [
            new RelationClass(new School(), 'school_id', 'school_data')
        ];
    }

}
