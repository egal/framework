<?php

declare(strict_types=1);

namespace Egal\Auth\Tokens;

use Egal\Auth\Exceptions\InitializeUserMasterTokenException;
use Illuminate\Support\Carbon;

class UserMasterToken extends Token
{

    protected string $type = TokenType::USER_MASTER;

    private string|int $authIdentification;

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

    /**
     * @throws \Egal\Auth\Exceptions\InitializeUserMasterTokenException
     */
    public static function fromArray(array $array): Token
    {
        foreach (            ['type', 'auth_identification'] as $index
        ) {
            if (!array_key_exists($index, $array)) {
                throw new InitializeUserMasterTokenException('Incomplete information!');
            }
        }

        $token = new UserMasterToken();

        if ($array['type'] !== TokenType::USER_MASTER) {
            throw new InitializeUserMasterTokenException('Type mismatch!');
        }

        $token->setAuthIdentification($array['auth_identification']);
        $token->aliveUntil = Carbon::parse($array['alive_until']);

        return $token;
    }

}
