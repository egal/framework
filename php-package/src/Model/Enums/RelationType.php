<?php

declare(strict_types=1);

namespace Egal\Model\Enums;

enum RelationType: string
{

    case HAS_ONE = 'hasOne';
    case HAS_MANY = 'hasMany';
    case BELONGS_TO = 'belongsTo';
    case BELONGS_TO_MANY = 'belongsToMany';
    case HAS_MANY_DEEP = 'hasManyDeep';

}
