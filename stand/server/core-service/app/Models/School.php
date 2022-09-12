<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
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

    /**
     * @throws ReflectionException
     */
    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldTypeEnum::UUID))
            ->addFields([
                FieldMetadata::make('name', FieldTypeEnum::STRING)
                    ->required()
                    ->string()
                ,
                FieldMetadata::make('avatar', FieldTypeEnum::STRING)
                    ->string()
                ,
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME)
            ])
            ->addRelations([
                'students' => fn() => $this->hasMany(Speaker::class),
            ]);
    }
}
