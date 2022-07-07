CREATE TABLE users (
    id           SERIAL PRIMARY KEY,
    username     TEXT NOT NULL UNIQUE,
    password     TEXT NOT NULL,
    first_name   TEXT NOT NULL,
    last_name    TEXT NOT NULL,
    email        TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    created_at   TIMESTAMP DEFAULT NOW(),
    updated_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE nutrition (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    category    INTEGER NOT NULL,
    calories    INTEGER NOT NULL,
    quantity    INTEGER NOT NULL DEFAULT 1,
    image_url   TEXT NOT NULL,
    user_id     INTEGER NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);