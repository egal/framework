<?php

declare(strict_types=1);

namespace Egal\Model\Traits;

use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;

trait UseActionParameterMetadata
{

    private array $parametersValidationRules = [];

    public function initializeUseActionParametersMetadata(): void
    {
        $this->setParametersValidationRules();
    }

    private function setParametersValidationRules(): void
    {
        $modelMetadata = ModelMetadataManager::getModelMetadata(static::class);
        foreach ($modelMetadata->getActions() as $action) {
            foreach ($action->getParameters() as $parameter) {
                $this->setParameterValidationRules($action, $parameter);
            }
        }

    }

    private function setParameterValidationRules(ActionMetadata $action, ActionParameterMetadata $parameter): void
    {
        $this->parametersValidationRules[$action->getName()][$parameter->getName()] = $parameter->getValidationRules();
    }

    public function getParametersValidationRules(string $actionName): array
    {
        return $this->parametersValidationRules[$actionName];
    }

}
