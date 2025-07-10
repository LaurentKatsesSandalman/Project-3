-- Active: 1747815168837@@127.0.0.1@3306@quicky
-- Don't forget the spreadsheet that simplifies creating tables
DROP DATABASE IF EXISTS quicky;

CREATE DATABASE quicky;
    -- CHARACTER SET utf8mb4
    -- COLLATE utf8mb4_unicode_ci;

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
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_public BOOL NOT NULL,
    multi_answer BOOL NOT NULL,
    original_version_id INT UNSIGNED,
    FOREIGN KEY (original_version_id) REFERENCES form (form_id),
    theme_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (theme_id) REFERENCES theme (theme_id),
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE,
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
    FOREIGN KEY (form_id) REFERENCES form (form_id) ON DELETE CASCADE,
    field_type_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (field_type_id) REFERENCES field_type (field_type_id)
);

CREATE TABLE field_option (
    field_option_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    option_ordering INT UNSIGNED NOT NULL,
    option_name VARCHAR(100) NOT NULL,
    option_value VARCHAR(100) NOT NULL,
    field_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (field_id) REFERENCES field(field_id) ON DELETE CASCADE
);

CREATE TABLE form_answer (
    form_answer_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    answer_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    form_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (form_id) REFERENCES form (form_id) ON DELETE CASCADE
);

CREATE TABLE field_answer (
    field_answer_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    field_answer_value VARCHAR(2000) NOT NULL,
    form_answer_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (form_answer_id) REFERENCES form_answer (form_answer_id) ON DELETE CASCADE,
    field_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (field_id) REFERENCES field(field_id)
);

INSERT INTO field_type (field_type_id, type) VALUES
(1, 'text'),
(2, 'checkbox'),
(3, 'date'),
(4, 'email'),
(5, 'month'),
(6, 'number'),
(7, 'radio'),
(8, 'tel'),
(9, 'url'),
(10, 'time'),
(11, 'textarea'),
(12, 'droplist'),
(13, 'notes');

INSERT INTO user (email, password) VALUES
('exemple@exemple.com', '$2b$10$8rwcxciPeOrq0mOkl.3lJuYEocIPbiKPjT1KHJ2SkNjabUoqEjEH.'),
('exemple2@exemple.com', '$2b$10$FRI.13foxavcYv18g64mTu.3lhHD4yGwdmPEtYkSXozXPI/ZOv5Sy'),
('exemple3@exemple.com', '$2b$10$DEFcgMhi.QP9gw.OdGXrlOAp82auzn4LN2hSU2/AChy4TMGpt2XTa'),
('exemple4@exemple.com', '$2b$10$3YEVAJhBtv1niWdjPxs58.sAFWepi7m5HZcV1xWKais7J/S1IhcwC'),
('exemple5@exemple.com', '$2b$10$/v4Rh6RSpAwVUPqNKztgV.Hqc5j4tu7DRZoAMd37yHGLUCAeXA4aG'),
('exemple6@exemple.com', '$2b$10$Tb3B3xoHasWTZsJ1TPCKF.2dG1leQNDlzEqeH5wd.HqNiT2PtMD6.'),
('exemple7@exemple.com', '$2b$10$pktB9ekk49c88nStA6xewOPOpsSQutHJ7iWveICoYzPp0hYpguM.y'),
('exemple8@exemple.com', '$2b$10$1FpgyyDt8HSDCH7oQrXtyO4i7r.mbfqzljjvEgTu5rah8NujPI39K');

INSERT INTO theme (color_value, font1_size, font2_size, font1_value, font2_value) VALUES
(169,20,16,"Spectral","Chivo");

INSERT INTO form (is_deployed, is_closed, creation_date, is_public, multi_answer, theme_id, user_id, form_name, form_description) VALUES
(1,0,"2024-06-01 00:00:01",1,1,1,1,"Titre du formulaire","Description de mon formulaire, je suis sur qu'il est bien et qu'il faut y repondre"),
(1,0,"2023-06-02 00:01:01",0,0,1,2, "form2 name", "form2 desc");

INSERT INTO field (field_id,field_ordering,field_name,field_description,is_required,is_unique,form_id,field_type_id) VALUES
(1,1,"ééééééé ?","Ton prenom et nom de famille",1,0,1,1),
(2,2,"quel animal aimes-tu ?","",0,0,1,2),
(3,3,"quel est ton anniversaire?","",0,0,1,3),
(4,4,"quel est ton email ?","",1,1,1,4),
(6,6,"combien d'amis as-tu ?","",0,0,1,6),
(7,7,"bleu, blanc ou rouge ?","Choisis une couleur",1,0,1,7),
(8,8,"quel numero de telephone ?","",0,0,1,8),
(9,9,"adresse de ton linkedin ?","",0,0,1,9),
(10,10,"à quelle heure vas-tu manger ?","",0,0,1,10),
(11,11,"decris-nous ta maison","Dis-nous à quoi elle ressemble",0,0,1,11),
(12,12,"selectionne ton genre","",0,0,1,12);

INSERT INTO field_option (option_ordering,option_name,option_value,field_id) VALUES
(1,"Chat","chat",2),
(2,"Chien","chien",2),
(3,"Hamster","hamster",2),
(1,"Bleu","bleu",7),
(2,"Blanc","blanc",7),
(3,"Rouge","rouge",7),
(1,"Male","male",12),
(2,"Femelle","femelle",12),
(3,"Non-binaire","non-binaire",12),
(4,"Autre","autre",12);