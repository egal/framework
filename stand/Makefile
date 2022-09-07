DOT_ENV_FILE_PATH:=.env

generate-dot-env-file:
	test -f $(DOT_ENV_FILE_PATH) || cp "$(DOT_ENV_FILE_PATH).example" "$(DOT_ENV_FILE_PATH)"

auth-service-build: generate-dot-env-file
	docker-compose build --progress plain auth-service

auth-service-composer-install: generate-dot-env-file auth-service-build
	docker-compose run --rm --no-deps auth-service composer install

up: generate-dot-env-file
	docker-compose up
