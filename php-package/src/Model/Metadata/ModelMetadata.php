<?php

namespace Egal\Model\Metadata;

use Closure;
use Egal\Model\Exceptions\FieldNotFoundException;
use Egal\Model\Exceptions\RelationNotFoundException;

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

    protected array $actions = [];

    public static function make(string $modelClass, FieldMetadata $key): self
    {
        return new static($modelClass, $key);
    }

    public function __construct(string $modelClass, FieldMetadata $key)
    {
        $this->modelClass = $modelClass;
        $this->modelShortName = get_class_short_name($modelClass);
        $this->primaryKey = $key;
    }

    public function toArray(): array
    {
        $modelMetadata = [
            'model_class' => $this->modelClass,
            'model_short_name' => $this->modelShortName,
            'primary_key'   => $this->primaryKey->toArray(),
            'actions' => $this->actions,
            'relations' => $this->getRelations()
        ];

        foreach ($this->fields as $field) {
            $modelMetadata['fields'][] = $field->toArray();
        }

        foreach ($this->fakeFields as $field) {
            $modelMetadata['fake_fields'][] = $field->toArray();
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

    public function addActions(array $actions): self
    {
        $this->actions = array_merge($this->actions, $actions);

        return $this;
    }

    public function fieldExist(string $fieldName): bool
    {
        foreach ($this->fields as $field) {
            if ($field->getName() === $fieldName) {
                return true;
            }
        }

        return false;
    }

    /**
     * @throws FieldNotFoundException
     */
    public function fieldExistOrFail(string $fieldName): bool
    {
        if (!$this->fieldExist($fieldName)) {
            throw FieldNotFoundException::make($fieldName);
        }

        return true;
    }

    public function relationExist(string $relation): bool
    {
        return array_key_exists($relation, $this->relations);
    }

    /**
     * @throws RelationNotFoundException
     */
    public function relationExistOrFail(string $relation): bool
    {
        if (!$this->relationExist($relation)) {
            throw RelationNotFoundException::make($relation);
        }

        return true;
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

    public function getModelClass(): string
    {
        return $this->$this->modelClass;
    }

    public function getActions(): array
    {
        return $this->actions;
    }

}
