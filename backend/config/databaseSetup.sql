-- CREATE DATABASE digitalit;

CREATE EXTENSION CITEXT;
CREATE TABLE user_account(
  user_id SERIAL PRIMARY KEY,
  email CITEXT UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  birth_date DATE NOT NULL,
  creation_date DATE NOT NULL
);

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