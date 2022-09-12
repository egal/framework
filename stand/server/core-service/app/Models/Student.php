<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use Egal\Model\Traits\UsesUuidKey;
use ReflectionException;

class Student extends Model
{
    use UsesUuidKey;

    protected $table = 'students';

    protected $fillable = [
        'name',
        'surname',
        'school_id'
    ];

    protected $hidden = [
        'user_id'
    ];

    protected $guarded = [
        'user_id'
    ];

    /**
     * @throws ReflectionException
     */
    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldTypeEnum::STRING))
            ->addFields([
                FieldMetadata::make('user_id', FieldTypeEnum::UUID)
                    ->addValidationRule('uuid')
                    ->required()
                ,
                FieldMetadata::make('name', FieldTypeEnum::STRING)
                    ->required()
                    ->string()
                ,
                FieldMetadata::make('surname', FieldTypeEnum::STRING)
                    ->required()
                    ->string()
                ,
                FieldMetadata::make('school_id', FieldTypeEnum::UUID)
                    ->addValidationRule('uuid')
                    ->addValidationRule('exists:schools,id')
                    ->required()
                ,
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME)
            ])
            ->addRelations([
                'school' => fn() => $this->belongsTo(School::class),
            ]);
    }
}
