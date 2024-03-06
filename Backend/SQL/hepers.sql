select * from teachers;
select * from students;
select * from admins;
select * from projects;
select * from tasks;
select * from tests;
select * from access_tokens;

insert into access_tokens (access_token, login, email, expiration_date)
VALUES ('qqq', 'test-login', 'enail@bk.ru', DATE_ADD(NOW(), INTERVAL 2 HOUR));

SELECT UNIX_TIMESTAMP(expiration_date) FROM access_tokens;

select exists(select access_token from access_tokens where access_token = 'qqq');

select * from users;

-- Creating `users` table as the union of [admins, students, teachers] tables
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_id INT,
    name VARCHAR(100),
    email VARCHAR(100),
    login varchar(100),
    created_at datetime,
    password varchar(64),
    role ENUM('admin', 'student', 'teacher')
);

-- inserting data from user types tables with unifying the result `users` id primary key & referenced original table key
INSERT INTO users (original_id, name, email, login, created_at, password, role)
SELECT id, name, email, login, created_at, password, 'student' FROM students;