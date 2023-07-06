\echo 'Delete and recreate lifetracker db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE lifetracker; --deletes the lifetracker database
CREATE DATABASE lifetracker; --creates a fresh lifetracker database
\connect liftracker --connects to lifetracker database
\i lifetracker-schema.sql -- runs lifetracker-schema.sql script

--\i lifetracker.sql --runs lifetracker.sql script

--\connect psql