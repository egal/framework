<?php

namespace Egal\Tests\Model\ActionGetItemsFilterByRelationTest\Models;

use Egal\Model\Enums\RelationType as RelationT;
use Egal\Model\Enums\VariableType as VariableT;
use Egal\Model\Metadata\Constructors\Metadata as m;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{

    protected $table = 'products';

    public static function constructMetadata(): ModelMetadata
    {
        return m::model(static::class)
            ->dynamic()
            ->policy('')
            ->timestamps(false)
            ->fields(
                m::id(),
                m::string('name'),
                m::integer('category_id'),
                ...m::timestamps(),
            )
            ->relations(

            )
            ->actions(m::action('getItem'));

        return ModelM::make(static::class, FieldM::make('id', VariableT::INTEGER))
            ->addFields([
            ])
            ->addFields(FieldsMetadataBlanks::timestamps())
            ->addRelations([
                RelationM::make('category', Category::class, RelationT::BELONGS_TO),
                RelationM::make('category_with_word', Category::class, RelationT::BELONGS_TO),
            ]);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function categoryWithWord(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

}
