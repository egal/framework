# Contributing

## Branch names

Template: `[version]-[updatetype]-[shorttopic]-in-[namespace]`

Options:

- `version`: `3.x` | `2.x`.
- `updatetype`: `patch` | `feature` | `fix`.
- `shorttopic`: short topic in kebab case.
- `namespace`:
  `packages/php/framework` | `packages/npm/framework`
  | `services/notification` | `services/postgres` | `services/rabbitmq` | `services/web`
  | `templates/server/service` | `templates/server/auth-service` | `templates/project` | `templates/gitlab-ci`
  | `stand`

Examples:

- `3.x-fix-pagination-in-packages-php-framework`

## Pull request names

Template: `[updatetype]: [topic]. ([namespace]) ([version])`

Options:

- `version`: `3.x` | `2.x`.
- `updatetype`: `Patch` | `Feature` | `Fix`.
- `topic`: short topic in sentence case.
- `namespace`:
  `packages/php/framework` | `packages/npm/framework`
  | `services/notification` | `services/postgres` | `services/rabbitmq` | `services/web`
  | `templates/server/service` | `templates/server/auth-service` | `templates/project` | `templates/gitlab-ci`
  | `stand`

Examples:

- `Feature: Auto generation Date and DateTime fields. (packages/npm/framework) (3.x)`

## Difference between patch, fix, feature.

### Feature

Something new that has never been possible before.

Что-то новое, до этого никогда такой возможности не было.

### Fix

A behavior requirement was previously made, but the actual behavior is not as expected.
It may also include fixing a logically incorrect behavior error.

Ранее было выставлено требование к поведению, но фактическое поведение не соответствует ожидаемому.
Также может включать в себя починку ошибки логически не верного поведения.

### Patch

An update not related to new functionality or bug fixes.
For example, improving performance, implementing those. debt, etc..

Обновление не связанное с новым функционалом или исправлением ошибок.
Например, улучшение производительности, реализация тех. долга и т.д..

## Local development

> **Platform reqs:**
> 1. Docker
> 2. Docker Compose
> 3. PHP
> 4. Composer
> 5. Node
> 6. NPM
>
> **Life-hack:**
>
> Add to your `.bashrc` (or `.zshrc`) file next aliases for using Compose, PHP dockerized:
> ```shell
> alias dockerrunhelper='docker run --rm --interactive --tty --volume ${PWD}:/app --workdir /app --user $(id -u):$(id -g)'
> alias composer='dockerrunhelper composer';
> alias php7.4='dockerrunhelper php:7.4-cli-buster'
> alias php8.0='dockerrunhelper php:8.0-cli-buster'
> alias php8.1='dockerrunhelper php:8.1-cli-buster'
> alias php8.2='dockerrunhelper php:8.2-cli-buster'
> alias php='php8.2'
> ```

1. Install deps:
    1. Packages:

         ```shell
         cd packages/npm-refine-keycloak && npm install && \
         cd packages/npm-refine-laravel-orion && npm install
         ```

    2. Examples:
        1. Foomarket

            ```shell
            cd examples/foomarket/server/inventory && compose install && \
            cd examples/foomarket/client/web && npm install
            ```

2. Run:

   Open in Jetbrains storm Run.

   > If in examples you need using local packages - run in container:
   > 
   > ```shell
   > # client container
   > npm link /packages/npm-refine-laravel-orion/ /packages/npm-refine-keycloak/
   > ```
