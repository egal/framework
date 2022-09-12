<?php

namespace App\Models;

use Egal\Model\Enums\FieldTypeEnum;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model as EgalModel;
use Egal\Model\Traits\UsesUuidKey;
use ReflectionException;

class Speaker extends EgalModel
{
    use UsesUuidKey;

    protected $table = 'speakers';

    protected $fillable = [
        'user_id',
        'name',
        'surname',
        'country_id',
        'avatar',
        'video'
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
                FieldMetadata::make('avatar', FieldTypeEnum::STRING)
                    ->string()
                ,
                FieldMetadata::make('video', FieldTypeEnum::STRING)
                    ->string()
                ,
                FieldMetadata::make('country_id', FieldTypeEnum::STRING)
                    ->string()
                    ->addValidationRule('exists:country,id')
                    ->required()
                ,
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME)
            ])
            ->addRelations([
                'country' => fn() => $this->belongsTo(Country::class),
                'languages' => fn() => $this->hasManyThrough(Language::class, AdditionalSpeakerLanguage::class)
            ]);
    }
}
