<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
* Table: movements
*
* === Columns ===
* @property int $id
* @property int $product_id
* @property string $status
* @property string $type
* @property int $count
* @property object|\stdClass $metadata
* @property \Carbon\Carbon|null $created_at
* @property \Carbon\Carbon|null $updated_at
*
* === Relationships ===
* @property-read \App\Models\Product|null $product
*/
class Movement extends Model
{

    use HasFactory;

    protected $fillable = [
        'product_id',
        'status',
        'type',
        'count',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'object',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

}
