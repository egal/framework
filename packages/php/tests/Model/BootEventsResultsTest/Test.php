<?php

namespace Egal\Tests\Model\BootEventsResultsTest;

use Egal\Tests\Model\Actions\SetRelationsTest\Models\Company;
use Egal\Tests\Model\Actions\SetRelationsTest\Models\Employee;
use Egal\Tests\Model\BootEventsResultsTest\Models\Maintainer;
use Egal\Tests\Model\BootEventsResultsTest\Models\Technique;
use Egal\Tests\TestCase;
use Egal\Tests\DatabaseMigrations;

class Test extends TestCase
{

    use DatabaseMigrations;

    public function getDir(): string
    {
        return __DIR__;
    }

    public function testBootEventsResult()
    {
        (new Employee())->save();
        (new Maintainer())->save();
        (new Technique())->save();
        (new Company())->save();
    }

}
