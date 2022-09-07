<?php

namespace App\Exceptions;

use Exception;

class TypeNotAllowedAsFieldTypeException extends Exception
{

    protected $code = 405;

    public static function make(string $fieldType): self
    {
        $exception = new static();
        $exception->message = "Type $fieldType not allowed as field type";

        return $exception;
    }

}
