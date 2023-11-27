CREATE DATABASE auction;
GRANT ALL PRIVILEGES ON DATABASE auction TO postgres;
-- CREATE EXTENSION pgcrypto;
-- SELECT gen_random_uuid();

-- \c auction;
-- CREATE TABLE IF NOT EXISTS "app_user" (
--     id UUID NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     first_name VARCHAR(255) NOT NULL,
--     last_name VARCHAR(255) NOT NULL,
--     balance INT NOT NULL,
--     temporary_hold INT,
--     refreshToken VARCHAR(255),
--     PRIMARY KEY(id)
-- );

-- INSERT INTO "app_user" (id, email, password, balance, first_name, last_name, temporary_hold, refreshToken) VALUES ('8042f4cb-90ab-4be8-a365-e36937e0ba77', 'johndoe@example.com', 123456, 100, 'John', 'Doe', null, null);

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