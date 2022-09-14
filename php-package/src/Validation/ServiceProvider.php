<?php

declare(strict_types=1);

namespace Egal\Validation;

use Egal\Validation\Exceptions\RegistrationValidationRuleException;
use Egal\Validation\Rules\LowerCaseRule;
use Egal\Validation\Rules\Rule;
use Egal\Validation\Rules\UpperCaseRule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider as IlluminateServiceProvider;

class ServiceProvider extends IlluminateServiceProvider
{

    /**
     * @throws \Exception
     */
    public function boot(): void
    {
        $this->registerRules([
            UpperCaseRule::class,
            LowerCaseRule::class,
        ]);
        $this->registerCustomRules();
    }

    /**
     * @throws \Exception
     */
    protected function registerCustomRules(): void
    {
        $dir = base_path('app/Rules');

        if (!is_dir($dir)) {
            return;
        }

        $classesFilesNames = array_filter(
            scandir($dir),
            static fn ($value) => $value !== '.' && $value !== '..' && str_contains($value, '.php')
        );
        $classesNames = array_map(
            static fn ($value) => 'App\\Rules\\' . str_replace('.php', '', $value),
            $classesFilesNames
        );
        $this->registerRules($classesNames);
    }

    /**
     * @throws \Exception
     */
    protected function registerRule(string $class): void
    {
        if ($class === Rule::class || !is_a($class, Rule::class, true)) {
            throw new RegistrationValidationRuleException('Registration error ' . $class . ' validation rule!');
        }

        /** @var \Egal\Validation\Rules\Rule $classInstance */
        $classInstance = new $class();
        Validator::extend($classInstance->getRule(), $classInstance->getCallback(), $classInstance->message());
    }

    /**
     * @param string[] $rulesClasses
     * @throws \Exception
     */
    protected function registerRules(array $rulesClasses): void
    {
        foreach ($rulesClasses as $ruleClass) {
            $this->registerRule($ruleClass);
        }
    }

}
