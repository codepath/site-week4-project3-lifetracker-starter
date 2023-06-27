
\echo 'Delete and recreate lifetracker db?';
\prompt 'Return for yes or control-C to cancel > ' foo;

DROP DATABASE IF EXISTS lifetracker;
CREATE DATABASE lifetracker;
\connect lifetracker;

\i lifetracker-schema.sql;


-- DROP DATABASE IF EXISTS lifetracker;
-- CREATE DATABASE lifetracker;
-- \connect lifetracker

-- \i lifetracker-schema.sql