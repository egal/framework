<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLanguagesTable extends Migration
{

    public function up()
    {
        Schema::create('languages', function (Blueprint $table) {
            $table->string('id')
                ->primary()
                ->unique();
            $table->string('name')
                ->unique();
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('languages');
    }

}
