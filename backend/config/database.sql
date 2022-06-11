CREATE DATABASE DigitalIT;

CREATE EXTENSION CITEXT;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE user_account(
  user_id uuid DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  email CITEXT UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  creation_date DATE NOT NULL,
  business BusinessData[],
  financial FinancialData[],
  PRIMARY KEY(user_id)
);

-- Inserting a user --
INSERT INTO user_account (full_name, email, password, phone_number, creation_date) 
VALUES ('Full Name', 'fullname@gmail.com', 'fullname123', '8123456', '2022-06-11');

CREATE TYPE BusinessData AS (
  business_name VARCHAR(255),
  categories VARCHAR(255),
  product ProductData[],
  has_digitalized VARCHAR(255),
  market_place Stores[]
);