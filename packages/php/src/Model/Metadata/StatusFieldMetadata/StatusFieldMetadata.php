<?php

namespace Egal\Model\Metadata\StatusFieldMetadata;

use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\FieldMetadata;

class StatusFieldMetadata extends FieldMetadata
{

    /**
     * @param Transaction[] $transactions
     */
    public array $transactions = [];

    protected function __construct(string $name, VariableType $type = VariableType::STRING)
    {
        parent::__construct($name, $type);
    }

    public static function make(string $name = 'status', VariableType $type = VariableType::STRING): static
    {
        return parent::make($name, $type);
    }

    public function addTransaction(Transaction $transaction): self
    {
        $this->transactions[] = $transaction;

        return $this;
    }

    /**
     * @param Transaction[] $transactions
     */
    public function addTransactions(array $transactions): self
    {
        foreach ($transactions as $transaction) $this->addTransaction($transaction);

        return $this;
    }

    /**
     * @return Transaction[]
     */
    public function getTransactions(): array
    {
        return $this->transactions;
    }

}
