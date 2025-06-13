import { RequestHandler } from "express";
import { body, validationResult } from "express-validator";

// Validation rules for the createUser route
export const createUserValidationRules = [
    body("email")
        .isEmail()
        .withMessage("Email invalide")
        .isLength({ max: 100 })
        .withMessage("Email de 100 caractères maximum")
        .notEmpty()
        .withMessage("Champ email requis"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Mot de passe de 8 caractères minimum"),
];

// Validation rules for loginUser route
export const loginUserValidationRules = [
    body("email")
        .notEmpty()
        .withMessage("Champ email requis")
        .isEmail()
        .withMessage("Email invalide"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Mot de passe de 8 caractères minimum"),
];

// Middleware used after input validations that returns an array of errors if there are any
export const validate: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
