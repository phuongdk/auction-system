CREATE DATABASE auction;
GRANT ALL PRIVILEGES ON DATABASE auction TO postgres;

-- \c auction;
-- CREATE TABLE IF NOT EXISTS "user" (
--     id INT NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     first_name VARCHAR(255) NOT NULL,
--     last_name VARCHAR(255) NOT NULL,
--     balance INT NOT NULL,
--     PRIMARY KEY(id)
-- );

-- INSERT INTO "user" (id, email, password, balance, first_name, last_name) VALUES (1, 'johndoe@example.com', 123456, 100, 'John', 'Doe');

-- CREATE TABLE IF NOT EXISTS product (
--     id INT NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     starting_price INT NOT NULL,
--     bid_price INT NOT NULL,
--     status VARCHAR(255) NOT NULL,
--     time_window INT NOT NULL,
--     userId INT NOT NULL,
--     PRIMARY KEY(id)
-- );

-- INSERT INTO product (id, name, starting_price, bid_price, status, time_window, userId) VALUES (1, 'Wood Table', 100, 100, 'unpublished', 100000, 1);