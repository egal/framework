<?php

namespace App\Models;

use App\Traits\HasUser;
use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\FieldsMetadataBlanks;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{

    use HasFactory;
    use HasUser;

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::UUID))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('user_id', VariableType::UUID)
                    ->required(),
                FieldMetadata::make('name', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('surname', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('school_id', VariableType::UUID)
                    ->addValidationRule('exists:schools,id')
                    ->required(),
            ])
            ->addFields(FieldsMetadataBlanks::timestamps())
            ->addRelations([
                RelationMetadata::make(
                    'school',
                    School::class,
                    RelationType::BELONGS_TO,
                )
            ])
            ->addActions([
                ActionMetadataBlanks::getMetadata(),
                ActionMetadataBlanks::getItem(VariableType::STRING),
                ActionMetadataBlanks::getItems(),
                ActionMetadataBlanks::create(),
                ActionMetadataBlanks::update(VariableType::STRING),
                ActionMetadataBlanks::delete(VariableType::STRING),
            ]);
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

}
