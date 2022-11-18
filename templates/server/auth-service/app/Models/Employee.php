<?php

declare(strict_types=1);

namespace App\Models;

use Egal\Auth\Policies\AllowAllPolicy;
use Egal\Model\Enums\VariableType;
use Egal\Model\Metadata\ActionMetadataBlanks;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Validation\Rule;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

class Employee extends Model
{

    use HasFactory;
    use HasRelationships;

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(Employee::class, FieldMetadata::make('id', VariableType::UUID))
            ->policy(AllowAllPolicy::class)
            ->addFields([
                FieldMetadata::make('address', VariableType::STRING)
                    ->default('Home Address'),
                FieldMetadata::make('phone', VariableType::INTEGER)
                    ->addValidationRule(Rule::notIn([1, 2, 3]))
                    ->nullable()
                    ->addValidationRule('unique:employees,phone'),
                FieldMetadata::make('adult', VariableType::BOOLEAN)
                    ->required(),
                FieldMetadata::make('weight', VariableType::NUMERIC)
                    ->required(),
                FieldMetadata::make('created_at', VariableType::DATE)
                    ->guarded(),
                FieldMetadata::make('updated_at', VariableType::DATE)
                    ->guarded(),
            ])
            ->addFakeFields([
                FieldMetadata::make('height', VariableType::NUMERIC)
                    ->sometimes()
                    ->required()
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

}
