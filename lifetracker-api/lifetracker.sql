\echo 'Do you want to delete the Database?'
\prompt 'Return for yes or control -C to cancel > ' answer

DROP DATABASE IF EXISTS lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql