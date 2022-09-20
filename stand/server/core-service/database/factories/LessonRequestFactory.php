<?php

namespace Database\Factories;

use App\Models\LessonRequest;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonRequestFactory extends Factory
{

    protected $model = LessonRequest::class;

    public function definition(): array
    {
        return [
            'supposedly_lesson_starts_at' =>  Carbon::now()->addSeconds(mt_rand(1,5000)),
            'stage' => $this->faker->word(),
        ];
    }

}
