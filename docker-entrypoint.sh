#!/bin/bash
set -e

# Wait for DB
until nc -z -v -w30 db 5432
do
  echo 'Waiting for PostgreSQL...'
  sleep 1
done
echo "PostgreSQL is up and running!"

# If the database exists, migrate. Otherwise setup (create and migrate)
bundle exec rake db:migrate 2>/dev/null || bundle exec rake db:setup

# Then exec the container's main process (what's set as CMD in the Dockerfile)
exec "$@" 