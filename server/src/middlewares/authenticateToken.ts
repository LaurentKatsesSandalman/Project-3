import dotenv from "dotenv";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

export const authenticateToken: RequestHandler = (req: any, res, next) => {
    const authHeader = req.headers["authorization"];
    const authToken = authHeader && authHeader.split(" ")[1];

    if (!authToken) {
        res.status(401).json({ error: "Token d'identification manquant" });
        return;
    }

    const privateKey = process.env.ACCES_TOKEN_SECRET;
    if (!privateKey) {
        console.error("ACCESS_TOKEN_SECRET is not configured");
        res.status(500).json({
            error: "Erreur serveur. Veuillez réessayer plus tard.",
        });
        return;
    }

    try {
        const payload = jwt.verify(authToken, privateKey);
        req.user = payload;
        next();
    } catch (err) {
        res.status(403).json({ error: "Token invalid" });
        return;
    }
};
