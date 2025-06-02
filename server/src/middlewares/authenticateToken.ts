import { RequestHandler } from "express";
// import { body, validationResult } from "express-validator";

export const authenticateToken: RequestHandler = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
};
