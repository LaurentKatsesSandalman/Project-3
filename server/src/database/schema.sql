-- Don't forget the spreadsheet that simplifies creating tables
DROP DATABASE IF EXISTS quicky;
CREATE DATABASE quicky;

USE quicky;

CREATE TABLE user (
    user_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE KEY,
    password CHAR(64) NOT NULL
);