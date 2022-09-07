<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserDataTable extends Migration
{
    public function up(): void
    {
        Schema::create('user_data', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('address');
            $table->integer('phone')->unique();
            $table->boolean('adult');
            $table->float('weight');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_data');
    }
}
