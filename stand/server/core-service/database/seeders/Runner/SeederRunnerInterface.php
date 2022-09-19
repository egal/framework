<?php

namespace Database\Seeders\Runner;

interface SeederRunnerInterface
{
    public function run(): void;

    public function create(array $data): void;
}
