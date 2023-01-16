<?php

declare(strict_types=1);

namespace App\Models;

use App\ValueTypes\Movement as ValueTypes;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;
use stdClass;

/**
 * Table: movements
 *
 * === Columns ===
 * @property int $id
 * @property int $product_id
 * @property ValueTypes\Status $status
 * @property ValueTypes\Type $type
 * @property int $count
 * @property object|stdClass $metadata
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * === Relationships ===
 * @property-read Product|null $product
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
        'status' => ValueTypes\Status::class,
        'type' => ValueTypes\Type::class,
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function handleStatus(): void
    {
        $statusName = $this->status->name;
        $handleFunction = "handleStatus${statusName}";

        if (!method_exists($this, $handleFunction)) {
            return;
        }

        /**
         * @uses Movement::handleStatusNew
         * @uses Movement::handleStatusProcessing
         */
        DB::transaction(fn() => call_user_func([$this, $handleFunction]));
    }

    private function handleStatusNew(): void
    {
        $this->status = ValueTypes\Status::Processing;
        $this->save();
    }

    private function handleStatusProcessing(): void
    {
        if ($this->type === ValueTypes\Type::Fire && $this->product->stock_count < $this->count) {
            $this->status = ValueTypes\Status::Canceled;

            // TODO: How to remake to some like this:
            // $this->metadata->status->{$this->status->value}->reason = CanceledReason::NotEnoughProductsCountInStock;
            $this->metadata = (object)array_merge_recursive((array)$this->metadata, [
                'status' => [
                    $this->status->value => [
                        'reason' => ValueTypes\StatusReasons\Canceled::NotEnoughProductsCountInStock
                    ]
                ]
            ]);

            $this->save();

            return;
        }

        $this->product->stock_count = match ($this->type) {
            ValueTypes\Type::Fill => $this->product->stock_count + $this->count,
            ValueTypes\Type::Fire => $this->product->stock_count - $this->count,
        };
        $this->product->save();

        $this->status = ValueTypes\Status::Completed;
        $this->save();
    }

}
