<?php

namespace App\Models;

use DateTime;
use Egal\AuthServiceDependencies\Models\Service as BaseService;
use Egal\Model\Traits\UsesUuidKey;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Collection;
use Ramsey\Uuid\Uuid;
use Staudenmeir\EloquentHasManyDeep\HasRelationships;

/**
 * @property uuid       $id             {@property-type field}  {@primary-key}
 * @property string     $address        {@property-type field}  {@validation-rules required|string}
 * @property int        $phone          {@property-type field}  {@validation-rules required|int|unique:user_data:phone}
 * @property bool       $adult          {@property-type field}  {@validation-rules required|boolean}
 * @property float      $weight         {@property-type field}  {@validation-rules required}
 * @property DateTime   $created_at     {@property-type field}
 * @property DateTime   $updated_at     {@property-type field}
 *
 * @property Collection $roles          {@property-type relation}
 * @property Collection $permissions    {@property-type relation}
 *
 * @action getItem  {@roles-access admin,developer}
 * @action getItems {@roles-access admin,developer}
 * @action create   {@roles-access admin,developer}
 * @action update   {@roles-access admin,developer}
 * @action delete   {@roles-access admin,developer}
 */
class UserData extends BaseService
{
    use UsesUuidKey;
    use HasFactory;
    use HasRelationships;

    protected $guarded = [
        'created_at',
        'updated_at',
    ];
}
