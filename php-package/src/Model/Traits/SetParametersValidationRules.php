<?php

declare(strict_types=1);

namespace Egal\Model\Traits;

use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;

//TODO Придумать название
trait SetParametersValidationRules
{

    private ModelMetadata $modelMetadata;

    private array $parametersValidationRules;

    public function initializeSetParametersValidationRules(): void
    {
        $this->modelMetadata = ModelMetadataManager::getModelMetadata(static::class);
        $this->setParametersValidationRules();
    }

    public function setParametersValidationRules(): void
    {
        foreach ($this->modelMetadata->getActions() as $action) {
            foreach ($action->getParameters() as $parameter) {
                $this->setParameterValidationRules($parameter);
            }
        }
    }

    public function setParameterValidationRules(ActionParameterMetadata $parameter): void
    {
        $this->parametersValidationRules[$parameter->getName()] = $parameter->getValidationRules();
    }

    public function getParametersValidationRules(): array
    {
        return $this->parametersValidationRules;
    }

}
