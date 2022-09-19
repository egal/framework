<?php

namespace Database\Seeders\Data;

class SchoolsData implements SeederDataInterface
{

    public function getData(): array
    {
        return [
            [
                'name' => 'SchoolFirst'
            ],
            [
                'name' => 'SchoolSecond'
            ]
        ];
    }
}
