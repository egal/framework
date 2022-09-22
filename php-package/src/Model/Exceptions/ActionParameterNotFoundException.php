<?php

declare(strict_types=1);

namespace Egal\Model\Exceptions;

use Exception;

class ActionParameterNotFoundException extends Exception
{

    protected $message = 'ActionParameter not found!';

    protected $code = 403;

    public static function make(string $parameter): self
    {
        $exception = new static();
        $exception->message = 'ActionParameter ' . $parameter . ' not found!';

        return $exception;
    }

}
