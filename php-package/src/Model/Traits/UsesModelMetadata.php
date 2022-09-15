<?php

declare(strict_types=1);

namespace Egal\Model\Traits;

use Egal\Model\Builder;
use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphPivot;
use Illuminate\Support\Facades\Log;
use Mockery\Exception;

/**
 * @package Egal\Model
 */
trait UsesModelMetadata
{

    private ModelMetadata $modelMetadata;

    private array $validationRules;

    public function initializeUsesModelMetadata(): void
    {
        $this->modelMetadata = ModelMetadataManager::getModelMetadata(static::class);

        $this->getValidationRules();
    }

    public abstract static function constructMetadata(): ModelMetadata;

    public final function getModelMetadata(): ModelMetadata
    {
        return ModelMetadataManager::getModelMetadata(static::class);
    }

    // TODO: протестировать реализацию

    /**
     * @return RelationMetadata[]
     */
    public function getRelations(): array
    {
        return $this->getModelMetadata()->getRelations();
    }

    /**
     * Get a specified relationship.
     *
     * @param  string  $relationName
     * @return RelationMetadata
     */
    public function getRelation($relationName): mixed
    {
        foreach ($this->getRelations() as $relation) {
            if ($relation->getName() === $relationName) {
                return $relation;
            }
        }

        throw new Exception();
    }

    public function getValidationRules(): array
    {
        $this->getValidationRule($this->modelMetadata->getPrimaryKey());

        foreach ($this->modelMetadata->getFields() as $field) {
            $this->getValidationRule($field);
        }

        foreach ($this->modelMetadata->getFakeFields() as $field) {
            $this->getValidationRule($field);
        }

        return $this->validationRules;
    }

    public function getValidationRule(FieldMetadata $field): void
    {
        $fieldValidationRules = $field->getValidationRules();
        $fieldType = $field->getType()->value;

        $this->validationRules[$field->getName()] = $fieldValidationRules;

        if (in_array($fieldType, $fieldValidationRules)) {
            return;
        }

        $this->validationRules[$field->getName()] = $fieldType;
    }


    /**
     * @param array|string $relations
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function with($relations)
    {
        $instance = new static();
        if (is_string($relations)) {
            $relation = $instance->getRelation($relations);
            dump($relation->getName());
            return static::query()->with($relation->getName(), $relation->getClosure());
        }
        Log::info('with');
    }

}
