CREATE TABLE if not exists "users" (
    id          SERIAL PRIMARY KEY,
    username    TEXT NOT NULL,
    password    TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    email       TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL,
    updated_at  TIMESTAMP NOT NULL 
);

CREATE TABLE if not exists "nutrition" (
    id          INTEGER NOT NULL,
    name        TEXT NOT NULL,
    category    TEXT NOT NULL,
    calories    INTEGER NOT NULL,
    image_url   TEXT NOT NULL,
    user_id     TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL
);