<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use ReflectionException;

class Language extends Model
{
    protected $keyType = 'string';

    protected $table = 'languages';

    protected $fillable = [
        'name'
    ];

    /**
     * @throws ReflectionException
     */
    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldTypeEnum::STRING))
            ->addFields([
                FieldMetadata::make('name', FieldTypeEnum::STRING)
                    ->required()
                    ->string()
                ,
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME)
            ])
            ->addRelations([
                'speakers' => fn() => $this->hasManyThrough(Speaker::class, AdditionalSpeakerLanguage::class)
            ]);
    }
}
