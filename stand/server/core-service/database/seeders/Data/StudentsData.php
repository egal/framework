<?php

namespace Database\Seeders\Data;

class StudentsData implements SeederDataInterface
{

    public function getData(): array
    {
        return [
            [
                'user_id' => 'aec9e77e-4ae1-49c6-adad-1b21a3f4b57d',
                "name" => 'Student',
                "surname" => 'Ivanov',
                'school_data' => [
                    'name' => 'SchoolSecond'
                ],
            ],
            [
                'user_id' => 'aec9e77e-4ae2-49c6-adad-2b21a3f4b57d',
                "name" => 'Student',
                "surname" => 'Petrov',
                'school_data' => [
                    'name' => 'SchoolSecond'
                ],
            ]
        ];
    }
}
