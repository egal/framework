<?php

namespace Database\Seeders\Runner;

use App\Models\School;
use Database\Seeders\Data\SchoolsData;

class SchoolsSeeder extends BaseSeederClass
{
    public function __construct()
    {
        $this->dataProvider = new SchoolsData();
        $this->model = new School();
    }
}
