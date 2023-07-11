CREATE TABLE users (
    id             SERIAL PRIMARY KEY,
    username       TEXT NOT NULL,  
    password       TEXT NOT NULL, 
    first_name     TEXT NOT NULL,
    last_name      TEXT NOT NULL, 
    email          TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1)

);

 CREATE TABLE nutrition (
    -- id for nutrition element in table
    id             SERIAL PRIMARY KEY, 
    name           TEXT NOT NULL,  
    category       TEXT NOT NULL, 
    calories       INTEGER,
    quantity       INTEGER,
    image_url      TEXT NOT NULL,
    recorded_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE exercise(
    id SERIAL PRIMARY KEY,
    exercise_name TEXT NOT NULL,
    category TEXT NOT NULL,
    duration INTEGER NOT NULL,
    intensity VARCHAR NOT NULL,
    recorded_at TIMESTAMP DEFAULT NOW(),
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

 CREATE TABLE sleep (
    id             SERIAL PRIMARY KEY,
    startTime      TIMESTAMP NOT NULL, 
    endTime        TIMESTAMP NOT NULL,
    recorded_at    TIMESTAMP DEFAULT NOW(),
    user_id        INTEGER NOT NULL
    -- FOREIGN KEY (user_id) REFERENCES users(id)
);