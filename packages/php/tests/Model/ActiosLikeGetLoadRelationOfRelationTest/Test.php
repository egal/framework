<?php

namespace Egal\Tests\Model\ActiosLikeGetLoadRelationOfRelationTest;

use Carbon\Carbon;
use Closure;
use Egal\Auth\Entities\Client;
use Egal\Core\Session\Session;
use Egal\Model\Builder;
use Egal\Model\Exceptions\RelationNotFoundException;
use Egal\Tests\DatabaseMigrations;
use Egal\Tests\Model\ActiosLikeGetLoadRelationOfRelationTest\Models\Category;
use Egal\Tests\Model\ActiosLikeGetLoadRelationOfRelationTest\Models\Product;
use Egal\Tests\PHPUnitUtil;
use Egal\Tests\TestCase;
use Illuminate\Support\Arr;
use Mockery as m;

class Test extends TestCase
{

    use DatabaseMigrations;

    public function getDir(): string
    {
        return __DIR__;
    }

    protected function seedData(): void
    {
        Category::create([
            'id' => 1,
            'name' => 'first_category',
        ]);
        Category::create([
            'id' => 2,
            'name' => 'first_category',
            'sale' => 30
        ]);
        Product::create([
            'id' => 1,
            'name' => 'first_product',
            'category_id' => 1,
        ]);
        Product::create([
            'id' => 2,
            'name' => 'second_product',
            'category_id' => 2,
        ]);
    }

    public function dataProvider(): array
    {
        return [
            [Product::class, 'actionGetItems', ['category'], 'items.0.category'],
            [Product::class, 'actionGetItems', ['category.products'], 'items.0.category.products'],
            [Product::class, 'actionGetItems', ['category.products.category'], 'items.0.category.products.0.category'],
            [Product::class, 'actionGetItem', ['category'], 'category'],
            [Product::class, 'actionGetItem', ['category.products'], 'category.products'],
            [Product::class, 'actionGetItem', ['category.products.category'], 'category.products.0.category'],
        ];
    }

    /**
     * @dataProvider dataProvider
     * @param class-string $model
     * @param class-string|string $expect
     */
    public function test(string $model, string $action, array $relations, string $expect)
    {
        $this->seedData();

        $user = m::mock(Client::class);
        $user->shouldReceive('mayOrFail')->andReturn(true);
        PHPUnitUtil::setProperty(app(Session::class), 'authEntity', $user);

        if (class_exists($expect)) $expectException = $expect;
        else $expectActualArrayHasKey = $expect;

        if (isset($expectException)) $this->expectException($expectException);

        $actual = $action === 'actionGetItem'
            ? $model::$action(key: 1, relations: $relations)
            : $model::$action(relations: $relations);

        if (isset($expectActualArrayHasKey)) $this->assertArrayHasKey($expectActualArrayHasKey, $actual);
    }

    public static function assertArrayHasKey($key, $array, string $message = ''): void
    {
        static::assertTrue(Arr::has($array, $key), "Array has no key `${key}`, but expected!");
    }

}
