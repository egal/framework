<?php

declare(strict_types=1);

namespace Egal\Model\Metadata\Constructors;

use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\FieldMetadata;

class Metadata
{

    public static function model(string $model, FieldMetadata $key = null): ModelMetadata
    {
        $key = $key ?? static::id();

        return new ModelMetadata($model, $key);
    }

    protected static function field(string $name, VariableType $type): FieldMetadata
    {
        return new FieldMetadata($name, $type);
    }

    public static function string(string $name): FieldMetadata
    {
        return new FieldMetadata($name, VariableType::STRING);
    }

    public static function integer(string $name): FieldMetadata
    {
        return new FieldMetadata($name, VariableType::INTEGER);
    }

    public static function uuid(string $name): FieldMetadata
    {
        return new FieldMetadata($name, VariableType::UUID);
    }

    public static function datetime(string $name): FieldMetadata
    {
        return new FieldMetadata($name, VariableType::DATETIME);
    }

    public static function date(string $name): FieldMetadata
    {
        return new FieldMetadata($name, VariableType::DATE);
    }

    public static function json(string $name): FieldMetadata
    {
        return new FieldMetadata($name, VariableType::JSON);
    }

    public static function boolean(string $name): FieldMetadata
    {
        return new FieldMetadata($name, VariableType::BOOLEAN);
    }

    public static function numeric(string $name): FieldMetadata
    {
        return new FieldMetadata($name, VariableType::NUMERIC);
    }

    public static function array(string $name): FieldMetadata
    {
        return new FieldMetadata($name, VariableType::ARRAY);
    }

    public static function id(string $name = 'id', VariableType $type = VariableType::INTEGER): FieldMetadata
    {
        return new FieldMetadata($name, $type);
    }

    /**
     * @return FieldMetadata[]
     */
    public static function timestamps(): array
    {
        return [
            static::datetime('updated_at')->nullable()->guarded(),
            static::datetime('created_at')->nullable()->guarded(),
        ];
    }

}
