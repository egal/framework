<?php

namespace Database\Seeders\Data;

class CountriesData implements SeederDataInterface
{

    public function getData(): array
    {
        return [
            [
                'name' => 'Russia',
                'id' => 'rus'
            ]
        ];
    }
}
