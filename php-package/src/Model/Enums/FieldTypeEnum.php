<?php

namespace Egal\Model\Enums;

use DateTime;
use Ramsey\Uuid\Uuid;

enum FieldTypeEnum: string
{

    case STRING = 'field';
    case INT = 'key';
    case FLOAT = 'float';
    case BOOL = 'bool';
    case UUID = Uuid::class;
    case DATETIME = DateTime::class;

}
