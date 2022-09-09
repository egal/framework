<?php

namespace App\Models;

use App\Metadata\FieldMetadata;
use App\Metadata\FieldTypeEnum;
use App\Metadata\ModelMetadataManager;
use App\Metadata\ModelMetadata;
use DateTime;
use Egal\Model\Model;
use Egal\Model\Traits\UsesUuidKey;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Collection;
use Ramsey\Uuid\Uuid;
use ReflectionException;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

/**
 * @property uuid       $id             {@property-type field}  {@primary-key}
 * @property string     $address        {@property-type field}  {@validation-rules required|string}
 * @property int        $phone          {@property-type field}  {@validation-rules required|int|unique:employees,phone}
 * @property bool       $adult          {@property-type field}  {@validation-rules required|boolean}
 * @property float      $weight         {@property-type field}  {@validation-rules required}
 * @property DateTime   $created_at     {@property-type field}
 * @property DateTime   $updated_at     {@property-type field}
 *
 * @property Collection $roles          {@property-type relation}
 * @property Collection $permissions    {@property-type relation}
 *
 * @action getItem  {@statuses-access guest|logged}
 * @action getItems {@statuses-access guest|logged}
 * @action create   {@statuses-access guest|logged}
 * @action update   {@statuses-access guest|logged}
 * @action delete   {@statuses-access guest|logged}
 */
class Employee extends Model
{

    use UsesUuidKey;
    use HasFactory;
    use HasRelationships;

    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    /**
     * @throws ReflectionException
     */
    public function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(Employee::class, FieldMetadata::make('id',FieldTypeEnum::UUID))
            ->addFields([
                FieldMetadata::make('address', FieldTypeEnum::STRING)
                    ->required()
                    ->string()
                ,
                FieldMetadata::make('phone', FieldTypeEnum::INT)
                    ->required()
                    ->int()
                    ->addValidationRule('unique:employees,phone')
                ,
                FieldMetadata::make('adult', FieldTypeEnum::BOOL)
                    ->required()
                    ->boolean()
                ,
                FieldMetadata::make('weight', FieldTypeEnum::FLOAT)
                    ->required()
                    ->float()
                ,
                FieldMetadata::make('created_at', FieldTypeEnum::DATETIME),
                FieldMetadata::make('updated_at', FieldTypeEnum::DATETIME)
            ])
            ->addFakeFields([
                FieldMetadata::make('height',  FieldTypeEnum::FLOAT)
                    ->sometimes()
                    ->required()
                    ->float()
            ])
            ->addRelations([
                'first' => fn() => $this->hasMany(User::class)
            ]);
    }

    public function getMetadata(): array
    {
        return ModelMetadataManager::getModelMetadata(static::class)->toArray();
    }

}
