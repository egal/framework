<?php

namespace Database\Seeders\Runner;

use Database\Seeders\Data\SeederDataInterface;
use Database\Seeders\RelationClass;
use Egal\Model\Model;
use Illuminate\Database\Seeder;

abstract class BaseSeederClass extends Seeder implements SeederRunnerInterface
{
    public Model $model;
    public SeederDataInterface $dataProvider;
    public array $relations = [];

    public function run(): void
    {
        $data = $this->dataProvider->getData();
        $this->create($data);
    }

    public function create(array $data): void
    {
        foreach ($data as $datum) {
            /** @var RelationClass $relation */
            foreach ($this->relations as $relation) {
                $datum = $relation->setRelation($datum);
            }
            if (!$this->model::query()->where($datum)->first()) {
                $this->model::query()->create($datum);
            }
        }
    }
}
