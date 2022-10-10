<?php

namespace Egal\Auth\Entities;

use Egal\Auth\Tokens\ServiceServiceToken;

class Service extends AuthEntity
{

    public readonly string $service;

    public function __construct(ServiceServiceToken $sst)
    {
        $this->service = $sst->getServiceName();
    }

}
