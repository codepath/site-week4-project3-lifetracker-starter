\echo 'Create life_tracker db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE life_tracker;
CREATE DATABASE life_tracker;
\connect life_tracker

\i life_tracker-schema.sql