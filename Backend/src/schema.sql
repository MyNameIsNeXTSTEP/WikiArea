CREATE DATABASE wiki_area;
USE wiki_area;

CREATE TABLE roles (
    id integer PRIMARY KEY AUTO_INCREMENT;
    role_name VARCHAR(40) NOT NULL;
);

INSERT INTO roles (role_name)
VALUES
('admin'),
('teacher'),
('student');