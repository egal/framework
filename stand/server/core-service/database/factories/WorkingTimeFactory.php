<?php

namespace Database\Factories;

use App\Models\WorkingTime;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class WorkingTimeFactory extends Factory
{

    protected $model = WorkingTime::class;

    public function definition(): array
    {
        return [
            'starts_at' => Carbon::now()->subDays(mt_rand(1,300)),
            'ends_at' => Carbon::now()->addDays(mt_rand(1,300)),
        ];
    }

}
