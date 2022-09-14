<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Enums\RelationTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Egal\Model\Traits\UsesUuidKey;
use ReflectionException;

class School extends Model
{
    use UsesUuidKey;

    protected $table = 'schools';

    protected $fillable = [
        'name',
        'avatar'
    ];

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldTypeEnum::UUID))
            ->addFields([
                FieldMetadata::make('name', FieldTypeEnum::STRING)
                    ->required()
                    ->addValidationRule('unique:schools,name')
                    ->string()
                ,
                FieldMetadata::make('avatar', FieldTypeEnum::STRING)
                    ->string()
                ,
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME)
            ])
            ->addRelations([
                RelationMetadata::make(
                    'students',
                    RelationTypeEnum::HAS_MANY,
                    fn() => $this->hasMany(Student::class)
                )
            ])
            ->addActions([
                'getItems',
                'create',
                'update'
            ]);
    }
}
