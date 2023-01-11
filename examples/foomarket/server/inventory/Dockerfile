ARG PHP_VERSION=8.2
ARG COMPOSER_VERSION=latest

###########################################
# Exapmle:
# https://github.com/exaco/laravel-octane-dockerfile
###########################################

FROM composer:${COMPOSER_VERSION} AS vendor
ARG ROOT=/var/www/html
WORKDIR $ROOT
COPY composer.json .
COPY composer.lock .
RUN composer install \
        --no-dev \
        --no-interaction \
        --prefer-dist \
        --ignore-platform-reqs \
        --optimize-autoloader \
        --apcu-autoloader \
        --ansi \
        --no-scripts \
        --audit


FROM php:${PHP_VERSION}-cli-buster as base
ARG ROOT=/var/www/html
WORKDIR $ROOT
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime; \
    echo $TZ > /etc/timezone
RUN apt-get update; \
    apt-get upgrade -yqq; \
    pecl -q channel-update pecl.php.net; \
    apt-get install -yqq --no-install-recommends --show-progress \
          libpq-dev
RUN docker-php-ext-install \
        pdo_pgsql \
        pgsql
COPY . .
COPY --from=vendor ${ROOT}/vendor vendor


FROM base as base-server
ARG SERVER=openswoole
RUN apt-get install -yqq --no-install-recommends --show-progress libc-ares-dev \
    && pecl -q install -o -f \
      -D 'enable-openssl="no" enable-http2="yes" enable-swoole-curl="yes" enable-mysqlnd="yes" enable-cares="yes" enable-sockets="no" enable-hook-curl="no" enable-postgres="no"' \
      ${SERVER} \
    && docker-php-ext-enable ${SERVER};
RUN apt-get clean; \
    docker-php-source delete; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*; \
    rm /var/log/lastlog /var/log/faillog
HEALTHCHECK --start-period=5s --interval=2s --timeout=5s --retries=8 CMD php artisan octane:status || exit 1


FROM node:16 AS server-develop-node
RUN npm install --global chokidar


FROM base-server as server-develop
COPY --from=server-develop-node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=server-develop-node /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
ENV NODE_PATH=/usr/local/lib/node_modules
CMD php artisan octane:start --host=localhost --watch


FROM base-server as server
CMD php artisan octane:start --host=localhost


FROM base as scheduler
RUN apt-get clean; \
    docker-php-source delete; \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*; \
    rm /var/log/lastlog /var/log/faillog
CMD php artisan schedule:work
