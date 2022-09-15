<?php

declare(strict_types=1);

namespace Egal\Model\Metadata;

use Egal\Model\Exceptions\ActionNotFoundException;
use Egal\Model\Exceptions\FieldNotFoundException;
use Egal\Model\Exceptions\RelationNotFoundException;

class ModelMetadata
{

    protected string $modelClass;

    protected string $modelShortName;

    protected ?FieldMetadata $primaryKey;

    /**
     * @var FieldMetadata[]
     */
    protected array $fields = [];

    /**
     * @var RelationMetadata[]
     */
    protected array $relations = [];

    protected array $fakeFields = [];

    /**
     * @var ActionMetadata[]
     */
    protected array $actions = [];

    public function __construct(string $modelClass, ?FieldMetadata $key)
    {
        $this->modelClass = $modelClass;
        $this->modelShortName = get_class_short_name($modelClass);
        $this->primaryKey = $key;
    }

    public static function make(string $modelClass, ?FieldMetadata $key = null): self
    {
        return new static($modelClass, $key);
    }

    public function toArray(): array
    {
        $modelMetadata = [
            'model_short_name' => $this->modelShortName,
            'primary_key' => $this->primaryKey->toArray(),
        ];

        $modelMetadata['fields'] = array_map(fn($field) => $field->toArray(), $this->fields);
        $modelMetadata['fake_fields'] = array_map(fn($field) => $field->toArray(), $this->fakeFields);
        $modelMetadata['relations'] = array_map(fn($relation) => $relation->toArray(), $this->relations);
        $modelMetadata['actions'] = array_map(fn($action) => $action->toArray(), $this->actions);

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
     * @param RelationMetadata[] $relations
     */
    public function addRelations(array $relations): self
    {
        $this->relations = array_merge($this->relations, $relations);

        return $this;
    }

    /**
     * @param ActionMetadata[] $actions
     */
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

    public function relationExist(string $relationName): bool
    {
        foreach ($this->relations as $relation) {
            if ($relation->getName() === $relationName) {
                return true;
            }
        }

        return false;
    }

    /**
     * @throws RelationNotFoundException
     */
    public function relationExistOrFail(string $relationName): bool
    {
        if (!$this->relationExist($relationName)) {
            throw RelationNotFoundException::make($relationName);
        }

        return true;
    }

    public function getModelShortName(): string
    {
        return $this->modelShortName;
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
        return $this->modelClass;
    }

    /**
     * @return ActionMetadata[]
     */
    public function getActions(): array
    {
        return $this->actions;
    }

    public function getHidden(): array
    {
        return array_map(fn($field) => $field->getName(), array_filter($this->fields, fn($field) => $field->isHidden()));
    }

    public function getFillable(): array
    {
        return array_map(fn($field) => $field->getName(), array_filter($this->fields, fn($field) => $field->isFillable()));
    }

    public function getGuarded(): array
    {
        return array_map(fn($field) => $field->getName(), array_filter($this->fields, fn($field) => $field->isGuarded()));
    }

    /**
     * @throws ActionNotFoundException
     */
    public function getAction(string $actionName): ActionMetadata
    {
        foreach ($this->actions as $action) {
            if ($action->getName() === $actionName) {
                return $action;
            }
        }

        throw ActionNotFoundException::make($this->modelClass, $actionName);
    }

}
