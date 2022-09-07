<?php

namespace App\Models;

use Egal\Model\Model;
use DateTime;

/**
 * @property int        $id                {@primary-key}          {@property-type field}
 * @property string     $role_id           {@property-type field}  {@validation-rules required|string}
 * @property string     $permission_id     {@property-type field}  {@validation-rules required|string}
 * @property DateTime   $created_at        {@property-type field}
 * @property DateTime   $updated_at        {@property-type field}
 *
 * @action getItem  {@roles-access admin,developer}
 * @action getItems {@roles-access admin,developer}
 * @action create   {@roles-access admin,developer}
 * @action update   {@roles-access admin,developer}
 * @action delete   {@roles-access admin,developer}
 */
class RolePermission extends Model
{

    protected $fillable = [
        'role_id',
        'permission_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
