<?php

namespace Database\Seeders\Data;

class SpeakersData implements SeederDataInterface
{

    public function getData(): array
    {
        return [
            [

                'user_id' => 'aec9e77e-4ae4-49c6-adad-1b21a3f4b57d',
                "name" => 'Ivan',
                "surname" => 'Ivanov',
                "country_id" => 'rus'
            ],
            [
                'user_id' => 'aec9e77e-4ae4-49c6-adad-2b21a3f4b57d',
                "name" => 'Petr',
                "surname" => 'Petrov',
                "country_id" => 'rus'
            ]
        ];
    }
}
