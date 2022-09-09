<?php

namespace App\Metadata;

enum FieldTypeEnum: string
{

    use EnumValuesTrait;

    case FIELD = 'field';

    case KEY = 'key';

    case FAKE_FIELD = 'fake_field';

}
