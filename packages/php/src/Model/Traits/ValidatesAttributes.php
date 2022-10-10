<?php

namespace Egal\Model\Traits;

use DateTime;

trait ValidatesAttributes
{

    use \Illuminate\Validation\Concerns\ValidatesAttributes;

    public function validateDateTime($attribute, $value): bool
    {
        return (DateTime::createFromFormat('Y-m-d G:i:s', $value) !== FALSE);
    }

}
