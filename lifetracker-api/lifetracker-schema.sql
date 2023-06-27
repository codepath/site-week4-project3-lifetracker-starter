CREATE TABLE users (
    id         SERIAL PRIMARY KEY,
    password   TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    location   TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
)

CREATE TABLE nutrition (
    id         SERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    category   TEXT NOT NULL,
    image_url  TEXT NOT NULL,
    user_id    TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
)