<?php

namespace App\Models;

use App\Policies\AllowPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Enums\RelationType;
use Egal\Model\Metadata\ActionMetadata;
use Egal\Model\Metadata\ActionParameterMetadata;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\RelationMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{

    use HasFactory;

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(self::class, FieldMetadata::make('id', VariableType::UUID))
            ->addPolicies([
                AllowPolicy::class,
            ])
            ->addFields([
                FieldMetadata::make('user_id', VariableType::UUID)
                    ->required()
                    ->hidden(),
                FieldMetadata::make('name', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('surname', VariableType::STRING)
                    ->required(),
                FieldMetadata::make('school_id', VariableType::UUID)
                    ->addValidationRule('exists:schools,id')
                    ->required(),
                FieldMetadata::make('created_at', VariableType::DATETIME),
                FieldMetadata::make('updated_at', VariableType::DATETIME),
            ])
            ->addRelations([
                RelationMetadata::make(
                    'school',
                    School::class,
                    RelationType::BELONGS_TO,
                )
            ])
            ->addActions([
                ActionMetadata::make('create'),
                ActionMetadata::make('update')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:students,id')
                    ]),
                ActionMetadata::make('getMetadata'),
                ActionMetadata::make('getItems'),
                ActionMetadata::make('delete')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:students,id')
                    ]),
                ActionMetadata::make('getItem')
                    ->addParameters([
                        ActionParameterMetadata::make('key', VariableType::UUID)
                            ->required()
                            ->addValidationRule('exists:students,id')
                    ]),
                ActionMetadata::make('getCount'),
                ActionMetadata::make('createMany'),
                ActionMetadata::make('updateMany'),
                ActionMetadata::make('updateManyRaw'),
                ActionMetadata::make('deleteMany'),
            ]);
    }

}
