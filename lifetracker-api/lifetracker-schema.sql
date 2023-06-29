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
  id         VARCHAR(20) PRIMARY KEY,
  name       VARCHAR(20) NOT NULL,
  category   VARCHAR(20) NOT NULL,
  calories   VARCHAR(20) NOT NULL,
  image_url  TEXT,
  created_at VARCHAR(20) NOT NULL
);