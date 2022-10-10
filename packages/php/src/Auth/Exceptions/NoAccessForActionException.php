<?php

declare(strict_types=1);

namespace Egal\Auth\Exceptions;

use Exception;

class NoAccessForActionException extends Exception
{

    protected $message = 'No access to action call!';

    protected $code = 403;

}
