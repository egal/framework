<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use ReflectionException;

class Lesson extends Model
{
    protected $table = 'lessons';

    protected $fillable = [
        'speaker_id',
        'school_id',
        'stage',
        'lesson_request_id',
        'starts_at',
        'chat_id'
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
                FieldMetadata::make('school_id', FieldTypeEnum::UUID)
                    ->addValidationRule('uuid')
                    ->addValidationRule('exists:schools,id')
                    ->required()
                ,
                FieldMetadata::make('stage', FieldTypeEnum::STRING)
                    ->string()
                    ->required()
                ,
                FieldMetadata::make('chat_id', FieldTypeEnum::UUID)
                    ->addValidationRule('uuid')
                    ->nullable()
                ,
                FieldMetadata::make('starts_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME),
            ])
            ->addRelations([
                'speaker' => fn() => $this->belongsTo(Speaker::class),
                'school' => fn() => $this->belongsTo(School::class),
            ]);
    }

}
