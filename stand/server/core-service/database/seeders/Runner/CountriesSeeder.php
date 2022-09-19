<?php

namespace Database\Seeders\Runner;

use App\Models\Country;
use Database\Seeders\Data\CountriesData;

class CountriesSeeder extends BaseSeederClass
{
    public function __construct()
    {
        $this->dataProvider = new CountriesData();
        $this->model = new Country();
    }

}
