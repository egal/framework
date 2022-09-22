<?php

namespace Database\Factories;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

class LessonFactory extends Factory
{

    protected $model = Lesson::class;

    public function definition(): array
    {
        return [
            'starts_at' => $this->faker->dateTime(),
            'stage' => $this->faker->word(),
            'chat_id' => $this->faker->uuid(),
        ];
    }

}
