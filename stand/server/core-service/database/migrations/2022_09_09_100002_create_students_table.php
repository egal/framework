<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{

    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('surname');
            $table->uuid('user_id');
            $table->uuid('school_id');
            $table->foreign('school_id')
                ->references('id')
                ->on('schools');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }

}
