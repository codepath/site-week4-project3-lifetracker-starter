\echo 'Delete and recreate lifetracker db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql

-- TO DO :
-- Follow the exact same steps for 1, 2, and 3, but with the lifetracker_test database.