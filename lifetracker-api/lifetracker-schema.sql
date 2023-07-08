CREATE TABLE users (
    id             SERIAL PRIMARY KEY,
    username       TEXT NOT NULL,  
    password       TEXT NOT NULL, 
    first_name     TEXT NOT NULL,
    last_name      TEXT NOT NULL, 
    email          TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1)
   
);

 CREATE TABLE nutrition (
    id             SERIAL PRIMARY KEY,
    name           TEXT NOT NULL,  
    category       TEXT NOT NULL, 
    calories       VARCHAR NOT NULL,
    image_url      TEXT NOT NULL
);

CREATE TABLE exercise(
    id SERIAL PRIMARY KEY,
    exercise_name TEXT NOT NULL,
    category TEXT NOT NULL,
    duration VARCHAR NOT NULL,
    intensity VARCHAR NOT NULL,
    recorded_at TIMESTAMP DEFAULT NOW(),
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);
