<?php /** @noinspection PhpUnused */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdditionalSpeakerLanguagesTable extends Migration
{

    public function up()
    {
        Schema::create('additional_speaker_languages', function (Blueprint $table) {
            $table->id();
            $table->uuid('speaker_id');
            $table->foreign('speaker_id')
                ->references('id')
                ->on('speakers')
                ->onDelete('cascade');
            $table->string('language_id');
            $table->foreign('language_id')
                ->references('id')
                ->on('languages')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('additional_speaker_languages');
    }

}
