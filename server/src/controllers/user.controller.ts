import { NextFunction, Request, RequestHandler, Response } from "express";
import type { NewUserInput, User } from "../types/user";
import { findAllUsers, insertUser } from "../models/user.model";

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
    req: Request<{}, {}, NewUserInput>,
    res: Response<User | { error: string }>,
    next: NextFunction
) => {
    console.log("body", req.body);
    const { email, password } = req.body;
    try {
        const newUser: User = await insertUser({ email, password });
        console.log("New User", newUser); // TEMP
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
