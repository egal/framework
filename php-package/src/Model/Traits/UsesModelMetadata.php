<?php

declare(strict_types=1);

namespace Egal\Model\Traits;

use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;

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

        $this->mergeFillable($this->modelMetadata->getFillable());
        $this->mergeGuarded($this->modelMetadata->getGuarded());
        $this->makeHidden($this->modelMetadata->getHidden());
    }

    public abstract static function constructMetadata(): ModelMetadata;

    public final function getModelMetadata(): ModelMetadata
    {
        return ModelMetadataManager::getModelMetadata(static::class);
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
     * Get the key type.
     *
     * @return string
     */
    public function getKeyType()
    {
        return $this->modelMetadata->getPrimaryKey()->getType()->value;
    }

}
