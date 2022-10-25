<?php

namespace Database\Seeders;

use App\Models\UserRole;
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
        $this->call(AdminRoleSeeder::class);
        $this->call(DeveloperRoleSeeder::class);
        $this->call(UserRoleSeeder::class);
        $this->call(UsersDebugSeeder::class);
        $this->call(EmployeeSeeder::class);
    }
}
