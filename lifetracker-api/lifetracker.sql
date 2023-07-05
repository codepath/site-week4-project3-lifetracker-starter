\echo 'Delete and recreate lifetracker db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql

\echo 'Delete and recreate lifetracker db?'
\prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE lifetracker;
-- CREATE DATABASE lifetracker;
-- \connect lifetracker

\i lifetracker-schema.sql