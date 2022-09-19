<?php

namespace Database\Seeders\Data;

class LessonsData implements SeederDataInterface
{

    public function getData(): array
    {
        return [
            [
                'speaker_data' => [
                    'user_id' => 'aec9e77e-4ae4-49c6-adad-1b21a3f4b57d',
                    "name" => 'Ivan',
                    "surname" => 'Ivanov',
                    "country_id" => 'rus'
                ],
                'school_data' => [
                    'name' => 'SchoolFirst'
                ],
                'stage' => 'A1',
                "starts_at" => '2020-02-12 17:35:07',
            ],
            [
                'speaker_data' => [
                    'user_id' => 'aec9e77e-4ae4-49c6-adad-1b21a3f4b57d',
                    "name" => 'Ivan',
                    "surname" => 'Ivanov',
                    "country_id" => 'rus'
                ],
                'school_data' => [
                    'name' => 'SchoolFirst'
                ],
                'stage' => 'A1',
                "starts_at" => '2020-02-12 12:35:07',
            ]
        ];
    }
}
