CREATE TABLE if not exists "users" (
    id          SERIAL PRIMARY KEY,
    username    TEXT UNIQUE NOT NULL,
    password    TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    email       TEXT UNIQUE NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP 

);

CREATE TABLE if not exists "nutrition" (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    category    TEXT NOT NULL,
    calories    INTEGER NOT NULL,
    image_url   TEXT NOT NULL,
    user_id     TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    created_at  TIMESTAMP NOT NULL

);