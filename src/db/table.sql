-- Create the table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    sub1_id TEXT[] NOT NULL,
    title VARCHAR(255),
    author VARCHAR(255),
    summary VARCHAR(255),
    price DECIMAL,
	cover_image_url VARCHAR(255),
    download_url VARCHAR(255),
    bk1 VARCHAR(255),
    bk2 VARCHAR(255),
    bk3 VARCHAR(255),
    bk4 VARCHAR(255),
    bk5 VARCHAR(255),
    bk6 VARCHAR(255)
);

-- Alter the sequence to start from 600001
ALTER SEQUENCE books_id_seq RESTART WITH 600001;
ALTER TABLE books
  ALTER COLUMN language_code SET DEFAULT 'en';