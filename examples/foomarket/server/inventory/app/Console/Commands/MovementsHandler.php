<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Movement;
use App\ValueTypes\Movement\Status;
use Illuminate\Console\Command;

/**
 * TODO: Handle stop process from outside.
 */
class MovementsHandler extends Command
{

    /**
     * @var string
     */
    protected $signature = 'handle:movements';

    /**
     * @var string
     */
    protected $description = 'Movements handler';

    protected string $logPrefix = 'Movements handler: ';

    private int $exitCode;

    public function handle(): int
    {
        $this->info('Started.');

        while (true) {
            $this->map();

            if (isset($this->exitCode)) {
                $this->info('Stopping...');
                return $this->exitCode;
            }

            usleep(100 * 1000);
        }
    }

    private function map(): void
    {
        Movement::query()
            ->whereNotIn('status', Status::getConcludes())
            ->get()
            ->each($this->getMapper());
    }

    private function getMapper(): callable
    {
        return fn(Movement $movement) => $this->mapper($movement);
    }

    private function mapper(Movement $movement): void
    {
        $previousStatus = $movement->status;
        $movement->handleStatus();
        $newStatus = $movement->status;

        if ($previousStatus !== $newStatus) {
            $this->info(sprintf(
                'Movement #%s status transitioned from "%s" to "%s".',
                $movement->id,
                $previousStatus->value,
                $newStatus->value
            ));
        } else {
            $this->error(sprintf(
                'Movement #%s not transitioned to new status from "%s"!',
                $movement->id,
                $previousStatus->value
            ));
            $this->makeNeedExit($this::FAILURE);
        }
    }

    private function makeNeedExit(int $code): void
    {
        $this->exitCode = $code;
    }

    public function line($string, $style = null, $verbosity = null)
    {
        parent::line(
            sprintf('%s%s', $this->logPrefix, $string),
            $style,
            $verbosity
        );
    }

}
