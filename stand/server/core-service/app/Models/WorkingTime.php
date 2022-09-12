<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use ReflectionException;

class WorkingTime extends Model
{
    protected $table = 'working_times';

    protected $fillable = [
        'speaker_id',
        'starts_at',
        'ends_at'
    ];

    /**
     * @throws ReflectionException
     */
    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldTypeEnum::INTEGER))
            ->addFields([
                FieldMetadata::make('speaker_id', FieldTypeEnum::UUID)
                    ->addValidationRule('uuid')
                    ->addValidationRule('exists:speakers,id')
                    ->required()
                ,
                FieldMetadata::make('starts_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('ends_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME),
            ])
            ->addRelations([
                'speaker' => fn() => $this->belongsTo(Speaker::class),
            ]);
    }

}
