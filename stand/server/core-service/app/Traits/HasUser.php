<?php

declare(strict_types=1);

namespace App\Traits;

use Egal\Core\Communication\Request;
use Egal\Model\Exceptions\ValidateException;
use Illuminate\Support\MessageBag;

trait HasUser
{

    public static function bootHasUser(): void
    {
        static::creating(static fn(self $entity) => $entity->validateUserIdAttribute());
    }

    private function validateUserIdAttribute(): void
    {
        $req = new Request('auth', 'User', 'getItem');
        $req->addParameter('key', $this->getAttribute('user_id'));
        $res = $req->call();

        if (!$res->isActionErrorMessageExists()) return;

        $error = $res->getActionErrorMessage();
        $exception = new ValidateException();
        $exception->setMessageBag(new MessageBag([$error->getMessage()]));
        throw $exception;
    }

}
