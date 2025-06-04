import dotenv from "dotenv";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

export const authenticateToken: RequestHandler = async (req: Request, res: Response<{ error: string }>, next: NextFunction) => {
    const { authorization } = req.headers;
    const authToken = authorization && authorization.split(' ')[1];
    
    if(!authToken) {
        res.status(401).json({error: "Token d'identification manquant"});
        return;
    }

    const privateKey = process.env.ACCES_TOKEN_SECRET;
    if (!privateKey) {
        res.status(500).json({
            error: "Erreur serveur. Veuillez réessayer plus tard.",
        });
        return;
    }

    jwt.verify(authToken, privateKey, (err, user) => {
        if(err) {
            res.status(403).json({ error:"Token invalid" });
            return;
        }
        req.user = user;
        next();
    })
};
