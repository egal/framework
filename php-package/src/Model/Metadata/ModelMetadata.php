<?php

namespace Egal\Model\Metadata;

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
    protected array $fields = [];

    protected array $fakeFields = [];

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
    public function __construct(string $modelClass, FieldMetadata $key)
    {
        $this->modelClass = $modelClass;
        $this->modelShortName = (new ReflectionClass($this->modelClass))->getShortName();
        $this->primaryKey = $key;
    }

    public function toArray(): array
    {
        $modelMetadata = [
            'model_class' => $this->modelClass,
            'model_short_name' => $this->modelShortName,
            'primary_key'   => $this->primaryKey,
        ];

        foreach ($this->fields as $field) {
            $modelMetadata['fields'][] = $field->toArray();
        }

        foreach ($this->fakeFields as $field) {
            $modelMetadata['fields'][] = $field->toArray();
        }

        return $modelMetadata;
    }

    /**
     * @param FieldMetadata[] $fields
     */
    public function addFields(array $fields): self
    {
        $this->fields = array_merge($this->fields, $fields);

        return $this;
    }

    /**
     * @param FieldMetadata[] $fakeFields
     */
    public function addFakeFields(array $fakeFields): self
    {
        $this->fakeFields = array_merge($this->fakeFields, $fakeFields);

        return $this;
    }

    /**
     * @param Closure[] $relations
     */
    public function addRelations(array $relations): self
    {
        $this->relations = array_merge($this->relations, $relations);

        return $this;
    }

    public function getPrimaryKey(): FieldMetadata
    {
        return $this->primaryKey;
    }

    public function getFields(): array
    {
        return $this->fields;
    }

    public function getFakeFields(): array
    {
        return $this->fakeFields;
    }

    public function getRelations(): array
    {
        return $this->relations;
    }
}
