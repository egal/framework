<?php

declare(strict_types=1);

namespace Egal\Model\Traits;

use Egal\Model\Builder;

/**
 * Trait UsesBuilder
 *
 * @package Egal\Model\Traits
 * @mixin \Egal\Model\Model
 */
trait UsesBuilder
{

    /**
     * Create a new Egal query builder for the model.
     *
     * @param \Illuminate\Database\Query\Builder $query
     */
    public function newEloquentBuilder($query): Builder|\Illuminate\Database\Eloquent\Builder
    {
        return new Builder($query);
    }

    public function newQuery(): Builder|\Illuminate\Database\Eloquent\Builder
    {
        if ($this->isInstanceForAction) {
            return $this->newQueryForAction();
        }

        return parent::newQuery();
    }

    public function newQueryForAction(): Builder|\Illuminate\Database\Eloquent\Builder
    {
        return parent::newQuery();
    }

}
