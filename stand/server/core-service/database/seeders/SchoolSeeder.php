<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\LessonRequest;
use App\Models\School;
use App\Models\Speaker;
use App\Models\Student;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{

    public function run()
    {
        if (School::count() !== 0) {
            return;
        }

        School::factory(20)->create()->each(function ($school) {
            Student::factory(5)->state(['school_id' => $school->id])->create();

            $speaker_ids = Speaker::all(['id']);
            foreach ($speaker_ids as $speaker) {
                /** @var Lesson $lesson */
                $lesson = Lesson::factory()->state([
                    'speaker_id' => $speaker->id,
                    'school_id' => $school->id
                ])->create();

                LessonRequest::factory()->state([
                    'id' => $lesson->id,
                    'speaker_id' => $speaker->id,
                    'school_id' => $school->id,
                ])->create();
            }
        });
    }

}
