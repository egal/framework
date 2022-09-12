<?php

namespace Egal\Model\Enums;

enum RelationTypeEnum: string
{

    case HAS_ONE            = 'hasOne';
    case HAS_MANY           = 'hasMany';
    case BELONGS_TO         = 'belongsTo';
    case BELONGS_TO_MANY    = 'belongsToMany';

}
