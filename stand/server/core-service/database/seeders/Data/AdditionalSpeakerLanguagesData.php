<?php

namespace Database\Seeders\Data;

class AdditionalSpeakerLanguagesData implements SeederDataInterface
{

    public function getData(): array
    {
        return [
            [
                'language_id' => 'en',
                'speaker_data' => [
                    'user_id' => 'aec9e77e-4ae4-49c6-adad-1b21a3f4b57d',
                    "name" => 'Ivan',
                    "surname" => 'Ivanov',
                    "country_id" => 'rus'
                ]
            ],
            [
                'language_id' => 'en',
                'speaker_data' => [
                    'user_id' => 'aec9e77e-4ae4-49c6-adad-2b21a3f4b57d',
                    "name" => 'Petr',
                    "surname" => 'Petrov',
                    "country_id" => 'rus'
                ]
            ]
        ];
    }
}
