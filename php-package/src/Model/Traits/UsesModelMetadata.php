<?php

declare(strict_types=1);

namespace Egal\Model\Traits;

use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Metadata\ModelMetadata;

/**
 * @package Egal\Model
 */
trait UsesModelMetadata
{

    public abstract static function constructMetadata(): ModelMetadata;

    public final function getModelMetadata(): ModelMetadata
    {
        return ModelMetadataManager::getModelMetadata(static::class);
    }

    public function getRelations(): array
    {
        return $this->getModelMetadata()->getRelations();
    }

    public function getValidationRules(): array
    {
        $modelMetadata = $this->getModelMetadata();
        $fields =  array_merge($modelMetadata->getFields(), $modelMetadata->getFakeFields());

        $validationRules = [];

        foreach ($fields as $field) {
            $validationRules[] = [$field->getName() => $field->getValidationRules()];
        }

        return $validationRules;
    }

}
