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
