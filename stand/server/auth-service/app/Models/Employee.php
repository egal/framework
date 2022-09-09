<?php

namespace App\Models;

use App\Metadata\FieldMetadata;
use App\Metadata\FieldTypeEnum;
use App\Metadata\MetadataManager;
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
    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(Employee::class, FieldMetadata::make('id', Uuid::class, FieldTypeEnum::KEY))
            ->addFields([
                FieldMetadata::make('address', 'string', FieldTypeEnum::FIELD)
                    ->required()
                    ->string()
                ,
                FieldMetadata::make('phone', 'int', FieldTypeEnum::FIELD)
                    ->required()
                    ->int()
                    ->addValidationRule('unique:employees,phone')
                ,
                FieldMetadata::make('adult', 'bool', FieldTypeEnum::FIELD)
                    ->required()
                    ->boolean()
                ,
                FieldMetadata::make('weight', 'float', FieldTypeEnum::FIELD)
                    ->required()
                    ->float()
                ,
                FieldMetadata::make('created_at', DateTime::class, FieldTypeEnum::FIELD),
                FieldMetadata::make('updated_at', DateTime::class, FieldTypeEnum::FIELD),
                FieldMetadata::make('height', 'float', FieldTypeEnum::FAKE_FIELD)
                    ->sometimes()
                    ->required()
                    ->float()
            ])
            ->addRelations([
                'first' => fn() => $this->hasMany(User::class)
            ]);
    }

    public static function getMetadata(): array
    {
        return MetadataManager::getModelMetadata(static::class)->toArray();
    }

}
