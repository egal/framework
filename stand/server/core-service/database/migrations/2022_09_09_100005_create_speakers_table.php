<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateSpeakersTable extends Migration
{

    public function up()
    {
        Schema::create('speakers', function (Blueprint $table) {
            $table->uuid('id')->primary();
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

        DB::statement('ALTER TABLE speakers ALTER COLUMN id SET DEFAULT uuid_generate_v4();');
    }

    public function down()
    {
        Schema::dropIfExists('speakers');
    }

}
