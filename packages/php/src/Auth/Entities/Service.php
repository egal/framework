<?php

declare(strict_types=1);

namespace Egal\Auth\Entities;

use Egal\Auth\Tokens\ServiceServiceToken;

class Service extends AuthorizedClient
{

    public readonly string $service;

    public function __construct(ServiceServiceToken $sst)
    {
        parent::__construct($sst);

        $this->service = $sst->getSub()['name'];
    }

}
