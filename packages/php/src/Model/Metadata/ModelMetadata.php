<?php

declare(strict_types=1);

namespace Egal\Model\Metadata;

use Egal\Model\Enums\VariableType;
use Egal\Model\Exceptions\ActionNotFoundException;
use Egal\Model\Exceptions\FieldNotFoundException;
use Egal\Model\Exceptions\RelationNotFoundException;
use Egal\Model\Exceptions\UnsupportedFilterValueTypeException;
use Egal\Model\Metadata\ActionMetadata\BaseActionMetadata;
use Illuminate\Validation\Concerns\ValidatesAttributes;

class ModelMetadata
{

    use ValidatesAttributes;

    protected readonly string $modelClass;

    protected readonly string $modelShortName;

    protected readonly ?FieldMetadata $key;

    protected array $fakeFields = [];

    /**
     * @var string[]
     */
    protected array $casts = [];

    /**
     * @var FieldMetadata[]
     */
    protected array $fields = [];

    /**
     * @var RelationMetadata[]
     */
    protected array $relations = [];

    /**
     * @var BaseActionMetadata[]
     */
    protected array $actions = [];

    /**
     * @var string[]
     */
    protected array $policies = [];

    public function __construct(string $modelClass, ?FieldMetadata $key)
    {
        $this->modelClass = $modelClass;
        $this->modelShortName = get_class_short_name($modelClass);
        $this->key = $key ?? null;
        $key?->guarded();
    }

    public static function make(string $modelClass, ?FieldMetadata $key = null): self
    {
        return new static($modelClass, $key);
    }

    public function toArray(bool $loadRelatedMetadata = false): array
    {
        $modelMetadata = [
            'model_short_name' => $this->modelShortName,
            'primary_key' => $this->key->toArray(),
        ];

        $modelMetadata['fields'] = array_map(fn(FieldMetadata $field) => $field->toArray(), $this->fields);
        $modelMetadata['fake_fields'] = array_map(fn(FieldMetadata $field) => $field->toArray(), $this->fakeFields);
        $modelMetadata['relations'] = array_map(fn(RelationMetadata $relation) => $relation->toArray($loadRelatedMetadata), $this->relations);
        $modelMetadata['actions'] = array_map(fn(BaseActionMetadata $action) => $action->toArray(), $this->actions);

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
     * @param BaseActionMetadata[] $actions
     */
    public function addActions(array $actions): self
    {
        $this->actions = array_merge($this->actions, $actions);

        return $this;
    }

    /**
     * @param string[] $casts
     */
    public function addCasts(array $casts): self
    {
        $this->casts = array_merge($this->casts, $casts);

        return $this;
    }

    /**
     * @param string[] $policies
     */
    public function addPolicies(array $policies): self
    {
        $this->policies = array_merge($this->policies, $policies);

        return $this;
    }

    public function fieldExist(string $fieldName): bool
    {
        return array_filter(
                [...$this->fields, ...$this->fakeFields, $this->getKey()],
                fn(FieldMetadata $field) => $field->getName() === $fieldName
            ) !== [];
    }

    /**
     * @throws FieldNotFoundException
     */
    public function fieldExistOrFail(string $fieldName): bool
    {
        return $this->fieldExist($fieldName)
            ? true
            : throw FieldNotFoundException::make($fieldName);
    }

    public function relationExist(string $relationName): bool
    {
        return isset($this->getRelations()[$relationName]);
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

    /**
     * @throws UnsupportedFilterValueTypeException
     */
    public function validateFieldValueType(string $fieldName, mixed $value): void
    {
        $field = array_filter(
            [...$this->fields, ...$this->fakeFields, $this->getKey()],
            fn(FieldMetadata $field) => $field->getName() === $fieldName
        );
        $field = reset($field);
        $fieldType = $field->getType();

        switch ($fieldType) {
            case VariableType::DATETIME:
                return;
            default:
                $validationMethod = 'validate' . ucfirst($fieldType->value);
                break;
        }

        $fieldValidated = $this->$validationMethod($fieldName, $value);

        if (!$fieldValidated) {
            throw UnsupportedFilterValueTypeException::make($fieldName, $field->getType()->value);
        }
    }

    public function hasPolicies(): bool
    {
        return $this->policies !== [];
    }

    public function getModelShortName(): string
    {
        return $this->modelShortName;
    }

    public function getKey(): FieldMetadata
    {
        return $this->key;
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
     * @return BaseActionMetadata[]
     */
    public function getActions(): array
    {
        return $this->actions;
    }

    /**
     * @throws ActionNotFoundException
     */
    public function getAction(string $actionName): BaseActionMetadata
    {
        foreach ($this->actions as $action) {
            if ($action->getName() === $actionName) {
                return $action;
            }
        }

        throw ActionNotFoundException::make($this->modelClass, $actionName);
    }

    /**
     * @return string[]
     */
    public function getHiddenFieldsNames(): array
    {
        return array_map(fn($field) => $field->getName(), array_filter([...$this->fields, ...$this->fakeFields, $this->getKey()], fn($field) => $field->isHidden()));
    }

    /**
     * @return string[]
     */
    public function getGuardedFieldsNames(): array
    {
        return array_map(fn($field) => $field->getName(), array_filter([...$this->fields, ...$this->fakeFields, $this->getKey()], fn($field) => $field->isGuarded()));
    }

    public function getCasts(): array
    {
        return $this->casts;
    }

    public function getPolicies(): array
    {
        return $this->policies;
    }

}
