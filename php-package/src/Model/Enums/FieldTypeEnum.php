<?php

namespace Egal\Model\Enums;

enum FieldTypeEnum: string
{

    case STRING     = 'string';
    case INTEGER    = 'integer';
    case FLOAT      = 'float';
    case BOOL       = 'bool';
    case UUID       = 'uuid';
    case DATETIME   = 'datetime';
    case DATE       = 'date';
    case JSON       = 'json';
    case BOOLEAN    = 'boolean';
    case NUMERIC    = 'numeric';

}
