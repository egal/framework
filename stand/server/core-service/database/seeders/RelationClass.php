<?php

namespace Database\Seeders;

use Egal\Model\Model;

class RelationClass
{
    public function __construct(public Model $relationModel, public string $keyName, public string $dataName)
    {
    }

    public function setRelation(array $object): array
    {
        $relationObject = $this->relationModel::query()->where($object[$this->dataName])->first();
        /** @var Model $relationObject */
        if ($relationObject) {
            $object[$this->keyName] = $relationObject->getAttribute('id');
        }
        unset($object[$this->dataName]);
        return $object;
    }
}
