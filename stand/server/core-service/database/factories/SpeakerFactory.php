<?php

namespace Database\Factories;

use App\Models\Speaker;
use Illuminate\Database\Eloquent\Factories\Factory;

class SpeakerFactory extends Factory
{

    protected $model = Speaker::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'surname' => $this->faker->lastName(),
            'avatar' => $this->faker->filePath(),
            'video' => $this->faker->filePath(),
            'user_id' => $this->faker->uuid(),
        ];
    }

}
