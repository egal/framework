<?php

declare(strict_types=1);

namespace Egal\Tests\Model;

use Egal\Core\Application;
use Egal\Core\ServiceProvider;
use Egal\Model\Enums\VariableType;
use Egal\Model\Facades\ModelMetadataManager;
use Egal\Model\Metadata\FieldMetadata;
use Egal\Model\Metadata\ModelMetadata;
use Egal\Model\Metadata\StatusFieldMetadata\StatusFieldMetadata;
use Egal\Model\Metadata\StatusFieldMetadata\Transaction;
use Egal\Model\Model as EgalModel;
use Egal\Tests\DatabaseSchema;
use Egal\Tests\TestCase;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\ServiceProvider as IlluminateServiceProvider;

/**
 * Class ModelActionGetItemsTest
 * @package Egal\Tests\Model
 */
class ModelStatusFieldTest extends TestCase
{

    use DatabaseSchema;

    protected function createSchema(): void
    {
        $this->schema()->dropIfExists('table');

        $this->schema()->create('table', function (Blueprint $table) {
            $table->increments('id');
            $table->string('status');
        });
    }

    protected function dropSchema(): void
    {
        $this->schema()->drop('table');
    }

    public function testSetDefaultValueOnCreate()
    {
        $model = new ModelStatusFieldTestModel();
        $model->save();

        $this->assertEquals('first', $model->getAttribute('status'));
    }

    public function testValidationRules()
    {
        $model = new ModelStatusFieldTestModel();
        $model->save();

        $this->assertEquals('first', $model->getAttribute('status'));
    }

}

class ModelStatusFieldTestModel extends EgalModel
{

    protected $table = 'table';

    public $timestamps = false;

    public static function constructMetadata(): ModelMetadata
    {
        return ModelMetadata::make(static::class, FieldMetadata::make('id', VariableType::STRING))
            ->addFields([
                StatusFieldMetadata::make()
                    ->addTransactions([
                        Transaction::make(ModelStatusFieldTestModelEnum::FIRST, ModelStatusFieldTestModelEnum::SECOND),
                        Transaction::make(ModelStatusFieldTestModelEnum::SECOND, ModelStatusFieldTestModelEnum::THIRD),
                        Transaction::make(ModelStatusFieldTestModelEnum::THIRD, ModelStatusFieldTestModelEnum::FIRST),
                    ])
                    ->default(ModelStatusFieldTestModelEnum::FIRST)
            ]);
    }

}

enum ModelStatusFieldTestModelEnum: string
{
    case FIRST = 'first';
    case SECOND = 'second';
    case THIRD = 'third';
}
