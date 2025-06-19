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
    theme_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    color_value INT NOT NULL,
    font1_value VARCHAR(30) NOT NULL,
    font2_value VARCHAR(30) NOT NULL,
    font1_size TINYINT(255),
    font2_size TINYINT(255)
);

CREATE TABLE form (
    form_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    is_deployed BOOL NOT NULL,
    is_closed BOOL NOT NULL,
    date_to_close DATE,
    creation_date DATETIME NOT NULL,
    is_public BOOL NOT NULL,
    multi_answer BOOL NOT NULL,
    original_version_id INT UNSIGNED,
    FOREIGN KEY (original_version_id) REFERENCES form (form_id),
    theme_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (theme_id) REFERENCES theme (theme_id),
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    form_name VARCHAR(100) NOT NULL,
    form_description VARCHAR(255)
);

CREATE TABLE field_type (
    field_type_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(20) NOT NULL
);

CREATE TABLE field(
    field_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    field_ordering INT UNSIGNED NOT NULL,
    field_name VARCHAR(255) NOT NULL,
    field_description VARCHAR(255),
    default_value VARCHAR(255),
    is_required BOOL NOT NULL,
    is_unique BOOL NOT NULL,
    form_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (form_id) REFERENCES form (form_id),
    field_type_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (field_type_id) REFERENCES field_type (field_type_id)
);

CREATE TABLE field_option (
    field_option_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    option_ordering INT UNSIGNED NOT NULL,
    option_name VARCHAR(100) NOT NULL,
    option_value VARCHAR(100) NOT NULL,
    field_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (field_id) REFERENCES field(field_id)
);

CREATE TABLE form_answer (
    form_answer_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    answer_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    form_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (form_id) REFERENCES form (form_id)
);

CREATE TABLE field_answer (
    field_answer_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    value VARCHAR(2000) NOT NULL,
    form_answer_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (form_answer_id) REFERENCES form_answer (form_answer_id),
    field_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (field_id) REFERENCES field(field_id)
);