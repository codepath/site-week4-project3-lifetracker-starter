\echo 'Delete and recreate the lifetracker database?'
\prompt 'Return for yes or Control-C to cancel > ' answer

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql
