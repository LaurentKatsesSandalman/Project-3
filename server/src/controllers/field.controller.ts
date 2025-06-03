import type { RequestHandler } from "express";
import { findAllFields } from "../models/field.model";

// The B of BREAD - Browse (Read All) operation

export const getAllFields: RequestHandler = async (req, res, next) => {
    try {
        //Find user ID pipapo
        const user_id = Number.parseInt(req.params.user_id);
        if (isNaN(user_id)) {
            /*faire la partie si pas un nbre*/
        }
        // Fetch all items
        const fields = await findAllFields(user_id);
        // Respond with the items in JSON format
        res.json(fields);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }

};

// The R of BREAD - Read operation
export const getThisField: RequestHandler = async (req, res, next) => {
    try {
        // Fetch a specific field based on the provided ID: field
        const field = await "TO DO";
        // If the field is not found, respond with HTTP 404 (Not Found)
        // Otherwise, respond with the field in JSON format
        if (field == null) {
            res.sendStatus(404);
            return;
        } else {
            res.json(field);
        }
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The A of BREAD - Add (Create) operation
export const createField: RequestHandler = async (req, res, next) => {
    try {
        // Extract the field data from the request body
        // Create the field
        // Respond with HTTP 201 (Created) and the ID of the newly inserted field
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The D of BREAD - Delete operation

export const deleteField: RequestHandler = async (req, res, next) => {
    try {
        //(écrit par Laurent) Trouve l'id à supprimer dans la requete
        // supprime le field concerné
        // répond avec un code 204 ("no content") ou 200 ("ok") ou 202 ("accepted" <= not done yet)
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// CES FONCTIONS NE SONT QUE DES EXEMPLES ET D'AUTRES MANQUENT
