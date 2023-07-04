DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS nutrition;

CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  username   TEXT NOT NULL,
  password   TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP
);

CREATE TABLE nutrition (
  id         SERIAL PRIMARY KEY,
  user_id    INT REFERENCES users(id),
  name       TEXT NOT NULL,
  category   TEXT NOT NULL,
  calories   VARCHAR(220) NOT NULL,
  image_url  TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);