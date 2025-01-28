.PHONY: setup build start stop console bash test lint

# Docker compose commands
setup:
	docker-compose build
	docker-compose run --rm app bundle install
	docker-compose run --rm app yarn install
	docker-compose run --rm app rails db:setup

build:
	docker-compose build

start:
	docker-compose up

stop:
	docker-compose down

# Rails commands
console:
	docker-compose run --rm app rails console

bash:
	docker-compose run --rm app bash

# Database commands
db-migrate:
	docker-compose run --rm app rails db:migrate

db-rollback:
	docker-compose run --rm app rails db:rollback

# Testing commands
test:
	docker-compose run --rm -e RAILS_ENV=test app rspec

# Linting commands
lint:
	docker-compose run --rm app rubocop
	docker-compose run --rm app yarn lint

# Utility commands
logs:
	docker-compose logs -f

clean:
	docker-compose down -v 