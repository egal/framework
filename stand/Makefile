DOT_ENV_FILE_PATH:=.env

# regionPrepare
generate-dot-env-file:
	test -f $(DOT_ENV_FILE_PATH) || cp "$(DOT_ENV_FILE_PATH).example" "$(DOT_ENV_FILE_PATH)"
build: generate-dot-env-file
	docker-compose build --progress plain
pull: generate-dot-env-file
	docker-compose pull --quiet
# endregionPrepare

# regionRelay
up: generate-dot-env-file pull build
	docker-compose up --detach $(docker-compose config --services | grep -v -e "[auth|core|notification]-service")
	docker-compose run --rm auth-service sh -c "/wait && php artisan migrate --force --seed"
	docker-compose run --rm core-service sh -c "/wait && php artisan migrate --force --seed"
	docker-compose run --rm notification-service sh -c "/wait && php artisan migrate --force --seed"
	docker-compose up --no-build auth-service notification-service || docker-compose down
down:
	docker-compose down
down-with-volumes:
	docker-compose down -t 0 --volumes
# endregionRelay

# regionSupport
# regionComposerInstall
auth-service-composer-install: generate-dot-env-file
	docker-compose run --rm --no-deps auth-service composer install
core-service-composer-install: generate-dot-env-file
	docker-compose run --rm --no-deps core-service composer install
# endregionComposerInstall
# regionComposerUpdate
auth-service-composer-update: generate-dot-env-file
	docker-compose run --rm --no-deps auth-service composer update
core-service-composer-update: generate-dot-env-file
	docker-compose run --rm --no-deps core-service composer update
# endregionComposerUpdate
generate-service-key: generate-dot-env-file
	docker-compose run --rm --no-deps auth-service sh -c "php artisan egal:key:generate --show"
# endregionSupport
