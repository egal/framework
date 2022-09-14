<?php

namespace Database\Seeders\Runner;

use App\Models\Language;
use Database\Seeders\Data\LanguagesData;

class LanguagesSeeder extends BaseSeederClass
{
    public function __construct()
    {
        $this->dataProvider = new LanguagesData();
        $this->model = new Language();
    }

}
