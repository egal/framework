<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Enums\RelationTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use ReflectionException;

class Language extends Model
{
    protected $keyType = 'string';

    protected $table = 'languages';

    protected $fillable = [
        'name'
    ];

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldTypeEnum::STRING))
            ->addFields([
                FieldMetadata::make('name', FieldTypeEnum::STRING)
                    ->required()
                    ->addValidationRule('unique:languages,name')
                    ->string()
                ,
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME)
            ])
            ->addRelations([
                RelationMetadata::make(
                    'speakers',
                    RelationTypeEnum::BELONGS_TO,//TODO Поменять на hasManyThrough
                    fn() => $this->hasManyThrough(Speaker::class, AdditionalSpeakerLanguage::class)
                ),
            ])
            ->addActions([
                'getItems',
                'create',
                'update'
            ]);
    }
}
