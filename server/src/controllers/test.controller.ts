import type { RequestHandler } from "express";
import { clearUser, insertMockUser } from "../models/test.model";

export const seedDatabase: RequestHandler = async (req, res, next) => {

    try{
        await clearUser()
        await insertMockUser()

        res.status(200).json({ message: 'Base de test réinitialisée' });
    }catch (error) {
    console.error('Erreur seed:', error);
    res.status(500).json({ error: 'Erreur lors du seed de la base' });
  }
}