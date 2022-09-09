<?php

namespace Egal\Model\Enums;

enum ValidationRulesEnum: string
{

    case REQUIRED = 'required';
    case SOMETIMES = 'sometimes';
    case STRING = 'string';
    case BOOLEAN = 'boolean';
    case INT = 'int';
    case FLOAT = 'float';

}
