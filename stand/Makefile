DOT_ENV_FILE_PATH:=.env

generate-dot-env-file:
	test -f $(DOT_ENV_FILE_PATH) || cp "$(DOT_ENV_FILE_PATH).example" "$(DOT_ENV_FILE_PATH)"

auth-service-build: generate-dot-env-file
	docker-compose build --progress plain auth-service

auth-service-composer-install: generate-dot-env-file auth-service-build
	docker-compose run --rm --no-deps auth-service composer install

auth-service-composer-update: generate-dot-env-file
	docker-compose run --rm --no-deps auth-service composer update

generate-service-key: generate-dot-env-file
	docker-compose run --rm --no-deps auth-service sh -c "php artisan egal:key:generate --show"

core-service-composer-install: generate-dot-env-file auth-service-build
	docker-compose run --rm --no-deps core-service composer install

core-service-composer-update: generate-dot-env-file
	docker-compose run --rm --no-deps core-service composer update

up-dependencies-detach:
	docker-compose up --detach rabbitmq postgres web-service proxy

up: generate-dot-env-file up-dependencies-detach
	docker-compose up auth-service core-service

down:
	docker-compose down -t 0
