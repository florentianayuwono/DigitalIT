CREATE DATABASE DigitalIT;

CREATE EXTENSION CITEXT;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE user_account(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255),
  email CITEXT UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  creation_date DATE NOT NULL,
  PRIMARY KEY(user_id)
);

-- Inserting a user --
INSERT INTO user_account (full_name, email, password, phone_number, creation_date) 
VALUES ('Full Name', 'fullname@gmail.com', 'fullname123', '8123456', '2022-06-11');

CREATE TABLE project(
  project_id SERIAL PRIMARY KEY,
  project_name VARCHAR(255) UNIQUE NOT NULL,
  marketplace_platform VARCHAR(255),
  sector INT,
  size INT,
  manager_id INT,
  creation_date DATE NOT NULL,
  FOREIGN KEY (manager_id) REFERENCES user_account (user_id)
);