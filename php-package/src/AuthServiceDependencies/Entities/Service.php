<?php

namespace Egal\AuthServiceDependencies\Entities;

use Egal\Auth\Tokens\ServiceServiceToken;

class Service
{

    public readonly string $service;

    public function __construct(ServiceServiceToken $sst)
    {
        $this->service = $sst->getServiceName();
    }

}
