CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  username   VARCHAR(20) NOT NULL,
  password   TEXT NOT NULL,
  first_name CHAR(20) NOT NULL,
  last_name  CHAR(20) NOT NULL,
  email      VARCHAR(50) NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL, 
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE nutrition (
  id         SERIAL PRIMARY KEY,
  name   VARCHAR(20) NOT NULL,
  category   VARCHAR(20) NOT NULL,
  quantity   VARCHAR(20) NOT NULL,
  calories   INT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE

);

CREATE TABLE exercise (
  id         SERIAL PRIMARY KEY,
  name   VARCHAR(20) NOT NULL,
  category   VARCHAR(20) NOT NULL,
  time   INT NOT NULL,
  intensity   INT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

