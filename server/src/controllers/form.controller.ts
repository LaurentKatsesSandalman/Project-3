import type { RequestHandler } from "express";
import { findAllForms } from "../models/form.model";
import { FormType } from "../types/form";

// The B of BREAD - Browse (Read All) operation

export const getAllForms: RequestHandler = async (req, res, next) => {
    try {
        //Find user ID
        const userId = Number.parseInt(req.params.user_id);
        if (isNaN(userId)) {
            res.status(400).json({
                error: "L'id du user est censée être numérique",
            });
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
export const getFormById: RequestHandler<
    { form_id: string },
    FormType | { error: string }
> = async (req, res, next) => {
    try {
        console.log(req.params);
        const parsedId = Number.parseInt(req.params.form_id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "L'id n'est pas un nombre" });
            return;
        }
        // We use a service to format the data we want
        const fullForm = await getFullForm(parsedId);
        res.status(200).json(fullForm);
    } catch (err) {
        next(err);
    }
};

// The A of BREAD - Add (Create) operation
export const createForm: RequestHandler = async (req, res, next) => {
    try {
        // Extract the form data from the request body
        // Create the form
        // Respond with HTTP 201 (Created) and the ID of the newly inserted form
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
