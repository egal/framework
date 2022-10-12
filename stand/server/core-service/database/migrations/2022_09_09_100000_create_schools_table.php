<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateSchoolsTable extends Migration
{


    public function up()
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('avatar')->nullable();
            $table->timestamps();
        });

        DB::statement('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        DB::statement('ALTER TABLE schools ALTER COLUMN id SET DEFAULT uuid_generate_v4();');
    }

    public function down()
    {
        Schema::dropIfExists('schools');
        DB::statement('DROP EXTENSION IF EXISTS "uuid-ossp"');
    }

}
