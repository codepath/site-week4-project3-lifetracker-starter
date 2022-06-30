\echo 'Delete and recreate lifetracker db?'
\prompt 'Return for yes or control-C for cancel > ' answer

DROP DATABASE vaccine_hub;
CREATE DATABASE vaccine_hub;
\connect vaccine_hub;

\i vaccine-hub-schema.sql