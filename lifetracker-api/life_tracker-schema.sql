CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL, 
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE CHECK(POSITION('@' IN email) > 1),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
);

CREATE TABLE nutrition(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    calories INT NOT NULL,
    image_url VARCHAR(255) NOT NULL UNIQUE CHECK(POSITION('https://' IN image_url) > 0),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
