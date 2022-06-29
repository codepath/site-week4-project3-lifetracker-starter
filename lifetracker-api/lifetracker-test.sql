\echo 'Delete and recreate the lifetracker_test database?'
\prompt 'Return for yes or Control-C to cancel > ' answer

DROP DATABASE lifetracker_test;
CREATE DATABASE lifetracker_test;
\connect lifetracker_test;

\i lifetracker-test-schema.sql
