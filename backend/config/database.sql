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
  business_category VARCHAR(255) NOT NULL,
  has_digitalized BOOLEAN,
  creation_date DATE NOT NULL,
  PRIMARY KEY (business_id),
  FOREIGN KEY (manager_id) REFERENCES user_account (user_id)
);

-- Inserting a business --
INSERT INTO business (manager_id, business_name, categories, has_digitalized)
VALUES ('60dc16dd-c7f1-4fde-827a-90c0e101555c', 'my business', 'electronics', 'yes');

CREATE TABLE product_main (
  product_id uuid DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_description VARCHAR(255) NOT NULL,
  product_category VARCHAR(255) NOT NULL,
  product_importance INT NOT NULL,
  age_target INT NOT NULL,
  gender_target INT NOT NULL,
  PRIMARY KEY (product_id)
);

CREATE TABLE product_secondary (
  product_local_id uuid DEFAULT uuid_generate_v4 UNIQUE NOT NULL,
  store_id SERIAL NOT NULL,
  business_id SERIAL NOT NULL,
  product_id uuid NOT NULL,
  product_cost NUMERIC NOT NULL,
  product_price NUMERIC NOT NULL,
  PRIMARY KEY (product_local_id),
  FOREIGN KEY (product_id) REFERENCES product_main (product_id),
  FOREIGN KEY (business_id) REFERENCES business (business_id),
  FOREIGN KEY (store_id) REFERENCES store (store_id)
);

CREATE TABLE product_sales (
  transaction_id SERIAL UNIQUE NOT NULL,
  product_id uuid NOT NULL,
  product_local_id uuid NOT NULL,
  store_id INT NOT NULL,
  input_date DATE NOT NULL,
  date_range INT NOT NULL,
  quantity INT NOT NULL,
  product_cost NUMERIC NOT NULL,
  product_price NUMERIC NOT NULL,
  individual_profit INT NOT NULL,
  total_profit INT NOT NULL,
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (product_id) REFERENCES product (product_id),
  FOREIGN KEY (product_local_id) REFERENCES product_secondary (product_local_id),
  FOREIGN KEY (store_id) REFERENCES store (store_id)
);

CREATE TABLE platform (
  platform_id SERIAL UNIQUE NOT NULL,
  platform_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (platform_id)
);

CREATE TABLE store (
  store_id SERIAL UNIQUE NOT NULL,
  store_name VARCHAR(255) NOT NULL,
  business_id SERIAL NOT NULL,
  store_manager_id uuid NOT NULL,
  store_platform_id SERIAL NOT NULL,
  creation_date DATE NOT NULL,
  PRIMARY KEY (store_id),
  FOREIGN KEY (business_id) REFERENCES business (business_id),
  FOREIGN KEY (store_manager_id) REFERENCES business (manager_id),
  FOREIGN KEY (store_platform_id) REFERENCES platform (platform_id)
);