CREATE TABLE usersLT  (
  id         SERIAL PRIMARY KEY,
  password   TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
  --location   TEXT NOT NULL,
  date       TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE exercise (
    exercise_id    SERIAL PRIMARY KEY,
    exercise_name Varchar(100) NOT NULL,
    category      Varchar(100) NOT NULL,
    duration      Varchar(100) NOT NULL,
    intensity     Varchar(100) NOT NULL,
    created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id       INT NOT NULL
);

CREATE TABLE newExcercise (
    id          SERIAL PRIMARY KEY,
    user_email  TEXT NOT NULL,
    title       TEXT NOT NULL,
    duration    TEXT NOT NULL,
    intensity   TEXT NOT NULL,
    date        TIMESTAMP NOT NULL DEFAULT NOW()         
);