<?php

declare(strict_types=1);

namespace Egal\Model\Exceptions;

use Exception;

class NoValidActionParametersException extends Exception
{

    protected $message = 'No valid action parameters!';

    protected $code = 403;

}
