USE quicky;

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
(220,16,20,"Verdana","Arial");

INSERT INTO form (is_deployed, is_closed, creation_date, is_public, multi_answer, theme_id, user_id, form_name, form_description) VALUES
(1,0,"2026-06-01 00:00:01",1,1,1,1,"Titre du formulaire","Description de mon formulaire, je suis sur qu'il est bien et qu'il faut y répondre"),
(1,0,"2025-06-02 00:01:01",0,0,1,2, "form2 name", "form2 desc");

INSERT INTO field (field_id,field_ordering,field_name,field_description,is_required,is_unique,form_id,field_type_id) VALUES
(1,1,"quel est ton nom ?","Ton prénom et nom de famille",1,0,1,1),
(2,2,"quel animal aimes-tu ?","",0,0,1,2),
(3,3,"quel est ton anniversaire?","",0,0,1,3),
(4,4,"quel est ton email ?","",1,1,1,4),
(5,5,"quand sont tes vacances ?","",0,0,1,5),
(6,6,"combien d'amis as-tu ?","",0,0,1,6),
(7,7,"bleu, blanc ou rouge ?","Choisis une couleur",1,0,1,7),
(8,8,"quel numéro de téléphone ?","",0,0,1,8),
(9,9,"adresse de ton linkedin ?","",0,0,1,9),
(10,10,"à quelle heure vas-tu manger ?","",0,0,1,10),
(11,11,"décris-nous ta maison","Dis-nous à quoi elle ressemble",0,0,1,11),
(12,12,"sélectionne ton genre","",0,0,1,12);

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