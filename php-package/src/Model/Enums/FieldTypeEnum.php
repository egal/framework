<?php

namespace Egal\Model\Enums;

use DateTime;
use Ramsey\Uuid\Uuid;

enum FieldTypeEnum: string
{

    case STRING     = 'string';
    case INTEGER    = 'integer';
    case FLOAT      = 'float';
    case BOOL       = 'bool';
    case UUID       = 'uuid';
    case DATETIME   = 'datetime';

}
