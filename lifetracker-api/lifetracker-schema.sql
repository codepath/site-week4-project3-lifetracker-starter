CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  username   VARCHAR(20) NOT NULL,
  password   VARCHAR(20) NOT NULL,
  first_name CHAR(20) NOT NULL,
  last_name  CHAR(20) NOT NULL,
  email      VARCHAR(50) NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  created_at TIMESTAMP NOT NULL, 
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE nutrition (
  id         SERIAL PRIMARY KEY,
  name   VARCHAR(20) NOT NULL,
  category   VARCHAR(20) NOT NULL,
  calories   INT NOT NULL,
  image_url  TEXT,
  user_id    INT NOT NULL,
  created_at TIMESTAMP NOT NULL
);