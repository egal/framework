<?php

namespace Database\Seeders;

use Database\Seeders\Runner\AdditionalSpeakerLanguagesSeeder;
use Database\Seeders\Runner\CountriesSeeder;
use Database\Seeders\Runner\LanguagesSeeder;
use Database\Seeders\Runner\LessonRequestsSeeder;
use Database\Seeders\Runner\LessonsSeeder;
use Database\Seeders\Runner\SchoolsSeeder;
use Database\Seeders\Runner\SpeakersSeeder;
use Database\Seeders\Runner\StudentsSeeder;
use Database\Seeders\Runner\WorkingTimesSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call(CountriesSeeder::class);
        $this->call(LanguagesSeeder::class);
        $this->call(SchoolsSeeder::class);
        $this->call(SpeakersSeeder::class);
        $this->call(WorkingTimesSeeder::class);
        $this->call(AdditionalSpeakerLanguagesSeeder::class);
        $this->call(StudentsSeeder::class);
        $this->call(LessonRequestsSeeder::class);
        $this->call(LessonsSeeder::class);
    }
}
