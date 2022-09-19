<?php

namespace Database\Seeders\Data;

class LanguagesData implements SeederDataInterface
{

    public function getData(): array
    {
        return [
            [
                'name' => 'English',
                'id' => 'en'
            ],
            [
                'name' => 'Russian',
                'id' => 'ru'
            ]
        ];
    }
}
