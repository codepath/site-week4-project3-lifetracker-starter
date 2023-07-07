CREATE TABLE users (
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE exercise (
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    duration INTEGER NOT NULL,
    intensity INTEGER NOT NULL
);

CREATE TABLE nutrition (
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    calories INTEGER NOT NULL,
    url VARCHAR(255) 
);

CREATE TABLE sleep (
    email VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time VARCHAR(255) NOT NULL
);

-- INSERT INTO users VALUES ('bereket');