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
  PRIMARY KEY (user_id)
);

-- Inserting a user --
INSERT INTO user_account (full_name, email, password, phone_number, creation_date) 
VALUES ('Full Name', 'fullname@gmail.com', 'fullname123', '8123456', '2022-06-11');

CREATE TABLE business (
  business_id SERIAL,
  user_id uuid,
  business_name VARCHAR(255),
  categories VARCHAR(255),
  has_digitalized VARCHAR(255),
  PRIMARY KEY (business_id),
  FOREIGN KEY (user_id) REFERENCES user_account (user_id)
);

CREATE TABLE product (
  product_id SERIAL,
  business_id INT,
  product_name VARCHAR(255),
  product_description TEXT,
  price NUMERIC,
  cost NUMERIC,
  PRIMARY KEY (product_id),
  FOREIGN KEY (business_id) REFERENCES business (business_id)
)

CREATE TABLE store (
  store_id SERIAL,
  business_id INT,
  platform VARCHAR(255),
  PRIMARY KEY (store_id),
  FOREIGN KEY (business_id) REFERENCES business (business_id)
)