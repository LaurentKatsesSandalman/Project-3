import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, RequestHandler, Response } from "express";
import type { UserInput, User, completeUser } from "../types/user";
import { findAllUsers, findUser, insertUser } from "../models/user.model";

dotenv.config();

// TEMP, used for practice
export const getAllUsers: RequestHandler = async (req, res, next) => {
    try {
        const users: User[] = await findAllUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

// Handles user creation: inserts a new user (email and password) and returns it (id and email only)
export const createUser: RequestHandler = async (
    req: Request<{}, {}, UserInput>,
    res: Response<User | { error: string }>,
    next: NextFunction
) => {
    const { email, password } = req.body;
    try {
        const newUser: User = await insertUser({ email, password });
        res.status(201).json(newUser);
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            res.status(409).json({
                error: `Adresse mail déjà utilisée`,
            });
            return;
        }
        next(err);
    }
};

// Handles user login
export const loginUser: RequestHandler = async (
    req: Request<{}, {}, UserInput>,
    res: Response<{ accessToken: string; id: number } | { error: string }>,
    next: NextFunction
) => {
    const { email, password } = req.body;
    try {
        // Look for a user with the corresponding unique email
        const user: completeUser | null = await findUser({ email });
        if (!user) {
            res.status(404).json({
                error: "Il n'existe pas d'utilisateur ayant cet email",
            });
            return;
        }

        // Compare the password with the hashed version of it to see if they match
        const isValidUser = await bcrypt.compare(password, user.password);
        if (!isValidUser) {
            res.status(401).json({ error: "Mot de passe incorrect" });
            return;
        }

        // Take the private key from the local .env to generate a token
        const privateKey = process.env.ACCES_TOKEN_SECRET;
        if (privateKey === undefined) {
            res.status(500).json({
                error: "Erreur serveur. Veuillez réessayer plus tard.",
            });
            return;
        }

        // Create the access token and sends it back to the client with the user_id
        const accessToken = jwt.sign({ id: user.id }, privateKey, {
            expiresIn: "12h",
        });
        res.status(201).json({
            accessToken: accessToken,
            id: user.id,
        });
    } catch (err) {
        next(err);
    }
};
