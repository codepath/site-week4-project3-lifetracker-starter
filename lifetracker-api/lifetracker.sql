\echo 'You are about to delete the lifetracker database'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker

\i lifetracker-schema.sql

\echo 'You are about to delete the lifetracker_test database'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lifetracker_test;
CREATE DATABASE lifetracker_test;
\connect lifetracker_test

\i lifetracker-schema.sql