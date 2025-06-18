import type { RequestHandler, Request, Response, NextFunction } from "express";
import { findAllForms, findFormById } from "../models/form.model";
import { insertForm } from "../models/field.model";

// The B of BREAD - Browse (Read All) operation

export const getAllForms: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //Find user ID
        const userId = Number.parseInt(req.user.user_id);
        if (isNaN(userId)) {
            res.status(400).json({ error: 'L\'id du user est censée être numérique' });
            return;
        }
        // Fetch all items
        const forms = await findAllForms(userId);
        // Respond with the items in JSON format
        res.json(forms);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }

};

// The R of BREAD - Read operation
export const getThisForm: RequestHandler = async (req, res, next) => {
    try {
        const formId = Number.parseInt(req.params.id)
        if (isNaN(formId)) {
            res.status(400).json({ error: 'L\'id du formulaire est censée être numérique' });
            return;
        }
        // Fetch a specific form based on the provided ID: form
        const form = await findFormById(formId);
        //respond with the form in JSON format
        res.json(form);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The A of BREAD - Add (Create) operation
export const createForm: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract the form data from the request body
        const {name, description, userId} = req.body;
        if (!name || !description || !userId) {
            res.status(400).json({ error: 'Tous les champs sont requis' });
            return;
        }
        // Create the form
        const newForm = await insertForm({name, description, userId});
        // Respond with HTTP 201 (Created) and the ID of the newly inserted form
        res.status(201).json({ id: newForm.id });
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The D of BREAD - Delete operation

export const deleteForm: RequestHandler = async (req, res, next) => {
    try {
        //(écrit par Laurent) Trouve l'id à supprimer dans la requete
        // supprime le form concerné
        // répond avec un code 204 ("no content") ou 200 ("ok") ou 202 ("accepted" <= not done yet)
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// CES FONCTIONS NE SONT QUE DES EXEMPLES ET D'AUTRES MANQUENT
