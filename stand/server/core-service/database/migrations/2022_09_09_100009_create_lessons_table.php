<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->uuid('speaker_id');
            $table->foreign('speaker_id')
                ->references('id')
                ->on('speakers')
                ->onDelete('cascade');
            $table->uuid('school_id');
            $table->foreign('school_id')
                ->references('id')
                ->on('schools');
            $table->timestamp('starts_at');
            $table->string('stage');
            $table->foreignId('lesson_request_id')
                ->nullable()
                ->constrained()
                ->onDelete('set null');
            $table->string('chat_id')
                ->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lessons');
    }
}
