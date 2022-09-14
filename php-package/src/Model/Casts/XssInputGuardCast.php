<?php

declare(strict_types=1);

namespace Egal\Model\Casts;

/**
 * Cast класс защиты атрибута от XSS защиты на ввод
 *
 * @package Egal\Model
 */
class XssInputGuardCast extends XssGuardCast
{

    /**
     * Возвращает значение атрибута неизменненым
     *
     * Отменяет действие {@see XssGuardCast::get()}
     *
     * @param mixed $model
     * @param mixed $value
     * @param array $attributes
     */
    public function get($model, string $key, $value, array $attributes): mixed
    {
        return $value;
    }

}
