<?php

declare(strict_types=1);

namespace Egal\Auth\Tokens;

use Egal\Auth\Exceptions\InitializeServiceMasterTokenException;
use Illuminate\Support\Carbon;

class ServiceMasterToken extends Token
{

    protected string $type = TokenType::SERVICE_MASTER;

    private string|int $authIdentification;

    /**
     * @param array $array
     * @throws \Egal\Auth\Exceptions\InitializeServiceMasterTokenException
     */
    public static function fromArray(array $array): ServiceMasterToken
    {
        foreach (['type', 'auth_identification'] as $index) {
            if (!array_key_exists($index, $array)) {
                throw new InitializeServiceMasterTokenException('Incomplete information!');
            }
        }

        if ($array['type'] !== TokenType::SERVICE_MASTER) {
            throw new InitializeServiceMasterTokenException('Type mismatch!');
        }

        $token = new ServiceMasterToken();
        $token->setAuthIdentification($array['auth_identification']);
        $token->aliveUntil = Carbon::parse($array['alive_until']);

        return $token;
    }

    public function getAuthIdentification(): int|string
    {
        return $this->authIdentification;
    }

    /**
     * @param int|string $authIdentification
     */
    public function setAuthIdentification($authIdentification): void
    {
        $this->authIdentification = $authIdentification;
    }

    public function toArray(): array
    {
        return [
            'type' => $this->type,
            'auth_identification' => $this->authIdentification,
            'alive_until' => $this->aliveUntil->toISOString(),
        ];
    }

}
