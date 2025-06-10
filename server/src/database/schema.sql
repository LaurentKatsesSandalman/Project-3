-- Don't forget the spreadsheet that simplifies creating tables
DROP DATABASE IF EXISTS quicky;

CREATE DATABASE quicky;

USE quicky;

CREATE TABLE user (
    user_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE KEY,
    password CHAR(64) NOT NULL
);

CREATE TABLE theme (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    color_value CHAR(8) NOT NULL,
    font1_value VARCHAR(30) NOT NULL,
    font2_value VARCHAR(30) NOT NULL,
    font1_size TINYINT(255),
    font2_size TINYINT(255)
);

CREATE TABLE form (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    is_deployed BOOL NOT NULL,
    is_closed BOOL NOT NULL,
    date_to_close DATE,
    creation_date DATETIME NOT NULL,
    is_public BOOL NOT NULL,
    multi_answer BOOL NOT NULL,
    original_version_id INT UNSIGNED,
    FOREIGN KEY (original_version_id) REFERENCES form (id),
    theme_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (theme_id) REFERENCES theme (id),
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE field_type (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(20) NOT NULL
);

CREATE TABLE field(
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ordering INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    default_value VARCHAR(255),
    is_required BOOL NOT NULL,
    is_unique BOOL NOT NULL,
    form_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (form_id) REFERENCES form (id),
    field_type_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (field_type_id) REFERENCES field_type (id)
);

CREATE TABLE field_option (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ordering INT UNSIGNED NOT NULL,
    name VARCHAR(100) NOT NULL,
    value VARCHAR(100) NOT NULL,
    field_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (field_id) REFERENCES field(id)
);

CREATE TABLE form_answer (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    answer_date DATETIME NOT NULL,
    form_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (form_id) REFERENCES form (id)
);

CREATE TABLE field_answer (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    value VARCHAR(255) NOT NULL,
    form_answer_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (form_answer_id) REFERENCES form_answer (id),
    field_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (field_id) REFERENCES field(id)
);