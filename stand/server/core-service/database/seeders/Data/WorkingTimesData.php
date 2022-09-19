<?php

namespace Database\Seeders\Data;

class WorkingTimesData implements SeederDataInterface
{

    public function getData(): array
    {
        return [
            [
                'speaker_data' => [
                    'user_id' => 'aec9e77e-4ae4-49c6-adad-2b21a3f4b57d',
                    "name" => 'Petr',
                    "surname" => 'Petrov',
                    "country_id" => 'rus'
                ],
                "starts_at" => '2020-02-12 10:35:07',
                "ends_at" => '2020-02-12 18:35:07',
            ],
            [
                'speaker_data' => [
                    'user_id' => 'aec9e77e-4ae4-49c6-adad-2b21a3f4b57d',
                    "name" => 'Petr',
                    "surname" => 'Petrov',
                    "country_id" => 'rus'
                ],
                "starts_at" => '2020-02-12 10:35:07',
                "ends_at" => '2020-02-12 18:35:07',
            ]
        ];
    }
}
