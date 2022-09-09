<?php

namespace App\Metadata;

use Closure;
use ReflectionClass;
use ReflectionException;

class ModelMetadata
{

    protected string $modelClass;

    protected string $modelShortName;

    protected FieldMetadata $primaryKey;

    /**
     * @var FieldMetadata[]
     */
    protected array $fields;

    /**
     * @var Closure[]
     */
    protected array $relations = [];

    /**
     * @throws ReflectionException
     */
    public static function make(string $modelClass, FieldMetadata $key): self
    {
        return new static($modelClass, $key);
    }

    /**
     * @throws ReflectionException
     */
    protected function __construct(string $modelClass, FieldMetadata $key)
    {
        $this->modelClass = $modelClass;
        $this->modelShortName = (new ReflectionClass($this->modelClass))->getShortName();
        $this->fields[] = $key;
    }

    /**
     * @param FieldMetadata[] $fields
     */
    public function addFields(array $fields): self
    {
        $this->fields[] = array_merge($this->fields, $fields);

        return $this;
    }

    /**
     * @param Closure[] $relations
     */
    public function addRelations(array $relations): self
    {
        $this->relations[] = array_merge($this->relations, $relations);

        return $this;
    }

}
