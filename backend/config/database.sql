-- CREATE DATABASE digitalit;
CREATE EXTENSION CITEXT;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE user_account(
  user_id uuid DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
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
  business_id SERIAL UNIQUE NOT NULL,
  manager_id uuid NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  categories VARCHAR(255) NOT NULL,
  has_digitalized BOOLEAN,
  PRIMARY KEY (business_id),
  FOREIGN KEY (manager_id) REFERENCES user_account (user_id)
);

-- Inserting a business --
INSERT INTO business (manager_id, business_name, categories, has_digitalized)
VALUES ('60dc16dd-c7f1-4fde-827a-90c0e101555c', 'my business', 'electronics', 'yes');

CREATE TABLE product (
  product_id SERIAL UNIQUE NOT NULL,
  business_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_description TEXT,
  price NUMERIC,
  cost NUMERIC,
  PRIMARY KEY (product_id),
  FOREIGN KEY (business_id) REFERENCES business (business_id)
);

CREATE TABLE store (
  store_id SERIAL UNIQUE NOT NULL,
  business_id INT NOT NULL,
  platform VARCHAR(255),
  PRIMARY KEY (store_id),
  FOREIGN KEY (business_id) REFERENCES business (business_id)
);