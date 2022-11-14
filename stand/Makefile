MAIN_SERVICES := auth-service|core-service|notification-service
DOT_ENV_FILE_PATH:=.env

# Prepare
generate-dot-env-file:
	test -f $(DOT_ENV_FILE_PATH) || cp "$(DOT_ENV_FILE_PATH).example" "$(DOT_ENV_FILE_PATH)"
build: generate-dot-env-file
	docker-compose build --progress plain
pull: generate-dot-env-file
	docker-compose pull --quiet

# Relay
up: generate-dot-env-file pull build
	docker-compose up --detach $(shell docker-compose config --services | grep -v -E "${MAIN_SERVICES}")
	docker-compose run --rm auth-service sh -c "/wait && php artisan migrate --force --seed"
	docker-compose run --rm core-service sh -c "/wait && php artisan migrate --force --seed"
	docker-compose run --rm notification-service sh -c "/wait && php artisan migrate --force --seed"
	docker-compose up --no-build $(shell docker-compose config --services | grep -E "${MAIN_SERVICES}") || docker-compose down
down:
	docker-compose down
down-with-volumes:
	docker-compose down -t 0 --volumes

# Support
# Composer Install
auth-service/composer-install: generate-dot-env-file
	docker-compose run --rm --no-deps auth-service composer install
core-service/composer-install: generate-dot-env-file
	docker-compose run --rm --no-deps core-service composer install
notification-service/composer-install: generate-dot-env-file
	docker-compose run --rm --no-deps notification-service composer install
# Composer Update
auth-service/composer-update: generate-dot-env-file
	docker-compose run --rm --no-deps auth-service composer update
core-service/composer-update: generate-dot-env-file
	docker-compose run --rm --no-deps core-service composer update
notification-service/composer-update: generate-dot-env-file
	docker-compose run --rm --no-deps notification-service composer update
generate-service-key: generate-dot-env-file
	docker-compose run --rm --no-deps auth-service sh -c "php artisan egal:key:generate --show"
# PHPCS
core-service/phpcs:
	docker-compose run --rm --no-deps core-service composer run-script post-package-install
