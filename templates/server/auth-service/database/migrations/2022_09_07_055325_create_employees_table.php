<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{

    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('address');
            $table->integer('phone')->unique()->nullable();
            $table->boolean('adult');
            $table->float('weight');

            $table->timestamps();
        });

        DB::statement('ALTER TABLE employees ALTER COLUMN id SET DEFAULT uuid_generate_v4();');
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }

}
