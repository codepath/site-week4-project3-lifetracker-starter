CREATE TABLE IF NOT EXISTS users (
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
    -- user_id        FOREIGN KEY    
    -- FOREIGN KEY (user_id) REFERENCES users(id)
);
