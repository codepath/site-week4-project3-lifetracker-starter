\echo 'Delete and recreate life_tracker db?'
\prompt 'Return for yes or control-c to cancel >' answer

DROP DATABASE life_tracker;
CREATE DATABASE life_tracker;

\connect life_tracker;

\i vaccine-hub-schema.sql