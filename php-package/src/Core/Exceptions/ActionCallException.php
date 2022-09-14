<?php

declare(strict_types=1);

namespace Egal\Core\Exceptions;

use Exception;

class ActionCallException extends Exception
{

    protected $message = 'Action call error!';

    protected $code = 400;

}
