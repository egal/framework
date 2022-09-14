<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Enums\RelationTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use ReflectionException;

class Country extends Model
{
    protected $keyType = 'string';

    protected $table = 'countries';

    protected $fillable = [
        'name'
    ];

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldTypeEnum::STRING))
            ->addFields([
                FieldMetadata::make('name', FieldTypeEnum::STRING)
                    ->required()
                    ->addValidationRule('unique:countries,name')
                    ->string()
                ,
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME)
            ])
            ->addRelations([
                RelationMetadata::make(
                    'speakers',
                    RelationTypeEnum::HAS_MANY,
                    fn() => $this->hasMany(Speaker::class)
                )
            ])
            ->addActions([
                'getItems',
                'create',
                'update'
            ]);
    }
}
