DOT_ENV_FILE_PATH:=.env
SERVICES:=auth-service core-service

generate-dot-env-file:
	test -f $(DOT_ENV_FILE_PATH) || cp "$(DOT_ENV_FILE_PATH).example" "$(DOT_ENV_FILE_PATH)"

auth-service-build: generate-dot-env-file
	docker-compose build --progress plain auth-service

auth-service-composer-install: generate-dot-env-file auth-service-build
	docker-compose run --rm --no-deps auth-service composer install

auth-service-composer-update: generate-dot-env-file
	docker-compose run --rm --no-deps auth-service composer update

up-dependencies-detach:
	docker-compose up --detach rabbitmq postgres

up: generate-dot-env-file up-dependencies-detach
	docker-compose up auth-service web-service

run-auth-service:
	docker-compose run --rm --no-deps auth-service sh -c "php artisan egal:run"

services-build: generate-dot-env-file
	for service in $(SERVICES); \
	do \
		docker-compose build --progress plain "$$service"; \
	done;

services-composer-install: services-build
	for service in $(SERVICES); \
	do \
		docker-compose run --rm --no-deps "$$service" composer install --no-cache --no-interaction --no-progress; \
	done;

services-composer-update: services-composer-install
	for service in $(SERVICES); \
	do \
		docker-compose run --rm --no-deps "$$service" composer update --no-cache --no-interaction --no-progress; \
	done;