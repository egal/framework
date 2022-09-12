<?php

namespace Egal\Model\Enums;

enum ValidationRulesEnum: string
{

    case REQUIRED = 'required';
    case SOMETIMES = 'sometimes';
    case NULLABLE = 'nullable';
    case STRING = 'string';
    case BOOLEAN = 'boolean';
    case INT = 'int';
    case FLOAT = 'float';
    case ACCEPTED = 'accepted';
    case ACTIVE_URL = 'active_url';
    case ALPHA = 'alpha';
    case ALPHA_DASH = 'alpha_dash';
    case ALPHA_NUM = 'alpha_num';
    case ARRAY = 'array';
    case BAIL = 'bail';
    case CONFIRMED = 'confirmed';
    case DATE = 'date';
    case DECLINED = 'declined';
    case EXCLUDE = 'exclude';
    case FILE = 'file';
    case FILLED = 'filled';
    case IMAGE = 'image';
    case INTEGER = 'integer';
    case IP = 'ip';
    case IPV4 = 'ipv4';
    case IPV6 = 'ipv6';

}
