#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER admin WITH PASSWORD 'password';

    CREATE DATABASE subscribely;
    GRANT ALL PRIVILEGES ON DATABASE subscribely TO admin;
EOSQL