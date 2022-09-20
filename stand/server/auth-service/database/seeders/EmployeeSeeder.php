<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{

    public function run(): void
    {
        if (Employee::count() !== 0) {
            return;
        }

        Employee::factory(20)->create();
    }

}
