<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpeakersTable extends Migration
{

    public function up()
    {
        Schema::create('speakers', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid')
                ->unique();
            $table->string('name');
            $table->string('surname');
            $table->string('avatar')
                ->nullable();
            $table->string('video')
                ->nullable();
            $table->string('country_id');
            $table->foreign('country_id')
                ->references('id')
                ->on('countries')
                ->onDelete('set null');
            $table->uuid('user_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('speakers');
    }

}