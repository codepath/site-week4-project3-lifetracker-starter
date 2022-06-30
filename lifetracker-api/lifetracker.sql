\echo "Delete and recreate the lifetracker database?"
\prompt "Return for yes or ctrl-C to cancel > " answer

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql 

\echo "Delete and recreate the lifetracker_test database?"
\prompt "Return for yes or ctrl-C to cancel > " answer

DROP DATABASE lifetracker_test;
CREATE DATABASE lifetracker_test;
\connect lifetracker_test;

\i lifetracker-schema.sql 