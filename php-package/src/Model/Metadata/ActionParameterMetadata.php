<?php

namespace Egal\Model\Metadata;

use Egal\Model\Exceptions\ValidateException;
use Illuminate\Support\Facades\Validator;

class ActionParameterMetadata extends AbstractValidatedAttributeMetadata
{

    protected mixed $defaultValue = null;

    /**
     * @throws ValidateException
     */
    public function setDefaultValue(mixed $defaultValue): self
    {
        $validator = Validator::make(['value' => $defaultValue], ['value' => $this->getValidationRules()]);
        if ($validator->fails()) {
            if ($validator->fails()) {
                $exception = new ValidateException();
                $exception->setMessageBag($validator->errors());

                throw $exception;
            }
        }
        $this->defaultValue = $defaultValue;
        return $this;
    }

    public function getDefaultValue(): mixed
    {
        return $this->defaultValue;
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'type' => $this->type->value,
            'validationRules' => $this->validationRules,
            'defaultValue' => $this->defaultValue
        ];
    }
}
