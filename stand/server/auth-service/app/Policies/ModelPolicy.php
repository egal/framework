<?php

namespace App\Policies;

class ModelPolicy
{
    public function actionDelete(): bool
    {
        return false;
    }
}
