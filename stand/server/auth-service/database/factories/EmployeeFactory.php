<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{

    protected $model = Employee::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->unique(true)->uuid,
            'address' => $this->faker->address(),
            'phone' => (int) $this->faker->unique()->regexify("[0-9]{6}"),
            'adult' => $this->faker->boolean(),
            'weight' => $this->faker->randomFloat(2,1,10),
        ];
    }

}
