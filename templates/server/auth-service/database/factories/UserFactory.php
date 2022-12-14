<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{

    protected $model = User::class;

    public function definition(): array
    {
        return [
            'email' => $this->faker->email,
            'password' => password_hash($this->faker->password, PASSWORD_BCRYPT),
        ];
    }

}
