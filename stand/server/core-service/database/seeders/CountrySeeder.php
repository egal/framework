<?php

namespace Database\Seeders;

use App\Models\AdditionalSpeakerLanguage;
use App\Models\Country;
use App\Models\Language;
use App\Models\Speaker;
use App\Models\WorkingTime;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{

    private const COUNT_COUNTRY_SEED = 6;
    private const COUNT_LANGUAGE_SEED = 2;

    public function run()
    {
        Country::unsetEventDispatcher();

        if (Country::count() !== 0) {
            return;
        }

        foreach (range(1, self::COUNT_COUNTRY_SEED) as $i) {
            Country::factory()->create()->each(function ($country) {
                Speaker::factory(6)->state(['country_id' => $country->id])->create()->each(function ($speaker) {
                    WorkingTime::factory(3)->state(['speaker_id' => $speaker->id])->create();

                    /** @var Language $languages */
                    $languages = [];
                    foreach (range(1, self::COUNT_LANGUAGE_SEED) as $j) {
                        $languages[] = Language::factory()->create();
                    }

                    foreach ($languages as $language) {
                        AdditionalSpeakerLanguage::factory(3)->state([
                            'speaker_id' => $speaker->id,
                            'language_id' => $language->id,
                        ])->create();
                    }
                });
            });
        }
    }

}
