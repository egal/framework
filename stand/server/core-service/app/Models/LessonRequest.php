<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Enums\RelationTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use ReflectionException;

class LessonRequest extends Model
{
    protected $table = 'lesson_requests';

    protected $fillable = [
        'speaker_id',
        'school_id',
        'stage',
        'supposedly_lesson_starts_at'
    ];

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', FieldTypeEnum::INTEGER))
            ->addFields([
                FieldMetadata::make('speaker_id', FieldTypeEnum::UUID)
                    ->uuid()
                    ->addValidationRule('exists:speakers,id')
                    ->required()
                ,
                FieldMetadata::make('school_id', FieldTypeEnum::UUID)
                    ->uuid()
                    ->addValidationRule('exists:schools,id')
                    ->required()
                ,
                FieldMetadata::make('stage', FieldTypeEnum::STRING)
                    ->string()
                    ->required()
                ,
                FieldMetadata::make('supposedly_lesson_starts_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'school',
                    RelationTypeEnum::BELONGS_TO,
                    fn() => $this->belongsTo(School::class)
                ),
                RelationMetadata::make(
                    'speaker',
                    RelationTypeEnum::BELONGS_TO,
                    fn() => $this->belongsTo(Speaker::class)
                )
            ])
            ->addActions([
                'getItems',
                'create',
                'update'
            ]);
    }

}
