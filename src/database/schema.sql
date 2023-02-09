CREATE DATABASE mycontacts;

CREATE TABLE IF NOT EXISTS categories (
  id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
  name VARCHAR(24) NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(50),
  category_id BINARY(16),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);