<?php

declare(strict_types=1);

namespace Egal\Model\Traits;

use Egal\Core\Session\Session;
use Egal\Model\Enums\FieldType;
use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use Illuminate\Support\Str;

/**
 * @package Egal\Model
 */
trait UsesModelMetadata
{

    private ModelMetadata $modelMetadata;

    private array $validationRules;

    private string $keyName;

    public function initializeUsesModelMetadata(): void
    {
        $this->modelMetadata = ModelMetadataManager::getModelMetadata(static::class);
        $this->keyType = $this->modelMetadata->getKey()->getType()->value;
        $this->keyName = $this->modelMetadata->getKey()->getName();

        $this->setKeyProperties();
        $this->setValidationRules();

        $this->mergeFillable($this->modelMetadata->getFillableFieldsNames());
        $this->mergeGuarded($this->modelMetadata->getGuardedFieldsNames());
        $this->makeHidden($this->modelMetadata->getHiddenFieldsNames());
    }

    public abstract static function constructMetadata(): ModelMetadata;

    private function setKeyProperties(): void
    {
        switch ($this->keyType) {
            case FieldType::INTEGER->value:
                $this->incrementing = true;
                return;
            case FieldType::UUID->value:
                static::creating(static function (Model $model): void {
                    $model->setAttribute($model->keyName, (string) Str::uuid());
                });
            default:
                $this->incrementing = false;
        }
    }

    public function setValidationRules(): void
    {
        $this->setValidationRule($this->modelMetadata->getKey());

        foreach ($this->modelMetadata->getFields() as $field) {
            $this->setValidationRule($field);
        }

        foreach ($this->modelMetadata->getFakeFields() as $field) {
            $this->setValidationRule($field);
        }
    }

    public function setValidationRule(FieldMetadata $field): void
    {
        $fieldValidationRules = $field->getValidationRules();
        $fieldType = $field->getType()->value;

        $this->validationRules[$field->getName()] = $fieldValidationRules;

        if (in_array($fieldType, $fieldValidationRules)) {
            return;
        }

        $this->validationRules[$field->getName()] = $fieldType;
    }

    public final function getModelMetadata(): ModelMetadata
    {
        return ModelMetadataManager::getModelMetadata(static::class);
    }

    public function getValidationRules(): array
    {
        return $this->validationRules;
    }

    /**
     * @return string
     */
    public function getKeyType()
    {
        return $this->keyType;
    }

    public function getIncrementing(): bool
    {
        return $this->incrementing;
    }

}
