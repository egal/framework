ARG PHP_VERSION=8.2
ARG COMPOSER_VERSION=latest

###########################################
# Exapmle:
# https://github.com/exaco/laravel-octane-dockerfile
###########################################

###########################################
# PHP dependencies
###########################################

FROM composer:${COMPOSER_VERSION} AS vendor
ARG ROOT=/var/www/html
WORKDIR $ROOT
COPY composer* .
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

###########################################

FROM php:${PHP_VERSION}-cli-buster as base
ARG ROOT=/var/www/html
WORKDIR $ROOT

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

RUN apt-get update; \
    apt-get upgrade -yqq; \
    pecl -q channel-update pecl.php.net; \
    apt-get install -yqq --no-install-recommends --show-progress \
          apt-utils \
          gnupg \
          gosu \
          git \
          curl \
          wget \
          libcurl4-openssl-dev \
          ca-certificates \
          supervisor \
          libmemcached-dev \
          libz-dev \
          libbrotli-dev \
          libpq-dev \
          libjpeg-dev \
          libpng-dev \
          libfreetype6-dev \
          libssl-dev \
          libwebp-dev \
          libmcrypt-dev \
          libonig-dev \
          libzip-dev zip unzip \
          libargon2-1 \
          libidn2-0 \
          libpcre2-8-0 \
          libpcre3 \
          libxml2 \
          libzstd1 \
          procps

###########################################
# OpenSwoole/Swoole extension
###########################################

ARG INSTALL_SWOOLE=true
ARG SERVER=openswoole

RUN if [ ${INSTALL_SWOOLE} = true ]; then \
        apt-get install -yqq --no-install-recommends --show-progress libc-ares-dev \
        && pecl -q install -o -f -D 'enable-openssl="yes" enable-http2="yes" enable-swoole-curl="yes" enable-mysqlnd="yes" enable-cares="yes"' ${SERVER} \
        && docker-php-ext-enable ${SERVER}; \
    fi

###########################################
# pdo_pgsql
###########################################

ARG INSTALL_PDO_PGSQL=true

RUN if [ ${INSTALL_PDO_PGSQL} = true ]; then \
      docker-php-ext-install pdo_pgsql; \
  fi

###########################################
# pgsql
###########################################

ARG INSTALL_PGSQL=true

RUN if [ ${INSTALL_PGSQL} = true ]; then \
        docker-php-ext-install pgsql; \
    fi

###########################################

RUN apt-get clean \
    && docker-php-source delete \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && rm /var/log/lastlog /var/log/faillog

COPY . .
COPY --from=vendor ${ROOT}/vendor vendor


FROM base as server
CMD php artisan octane:start --host=localhost


FROM base as scheduler
CMD php artisan schedule:work
