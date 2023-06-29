CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    username    VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    created_at  TIMESTAMP NOT NULL,
    updated_at  TIMESTAMP NOT NULL);

CREATE TABLE nutrition (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    category   VARCHAR(255) NOT NULL,
    quantity   VARCHAR(255) NOT NULL,
    calories   VARCHAR(255) NOT NULL,
    image_url  VARCHAR(255) NOT NULL,
    user_id    VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL);

CREATE TABLE exercise (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    category   VARCHAR(255) NOT NULL,
    duration   VARCHAR(255) NOT NULL<
    intensity  VARCHAR(255) NOT NULL,
    user_id    VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL);

CREATE TABLE sleep (
    id         SERIAL PRIMARY KEY,
    start_time TIMESTAMP NOT NULL;
    end_time   TIMESTAMP NOT NULL
    user_id    VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL);