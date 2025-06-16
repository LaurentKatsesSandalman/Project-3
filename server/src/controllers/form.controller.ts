import type { RequestHandler } from "express";
import { findAllForms, insertForm } from "../models/form.model";
import { getFullForm } from "../services/FullForm";
import { FormPayload, FullForm } from "../types/form";
import { formatDate } from "../utils/formatDate";

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
export const getFullFormById: RequestHandler<
    { id: string },
    FullForm | { error: string }
> = async (req: any, res, next) => {
    try {
        const parsedId = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "L'id n'est pas un nombre" });
            return;
        }
        // We use a service to format the data we want
        const fullForm = await getFullForm(parsedId);
        if (!fullForm) {
            res.status(404).json({
                error: "Il n'existe pas de formulaire ayant cet id",
            });
            return;
        }

        if (fullForm.user_id !== req.user.user_id) {
            res.status(403).json({
                error: "Le formulaire ayant cet id n'est pas le votre",
            });
            return;
        }

        res.status(200).json(fullForm);
    } catch (err) {
        next(err);
    }
};

export const getSecuredFullFormById: RequestHandler<
    { id: string },
    Partial<FullForm> | { error: string }
> = async (req, res, next) => {
    try {
        const parsedId = Number.parseInt(req.params.id);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: "L'id n'est pas un nombre" });
            return;
        }

        // We use a service to format the data we want
        const fullForm = await getFullForm(parsedId);

        // All the cases where the securedFullForm should not be returned to the front
        if (!fullForm || !fullForm.is_deployed) {
            res.status(404).json({
                error: "404 - Formulaire n'existe pas",
            });
            return;
        }

        if (fullForm.is_closed) {
            res.status(403).json({
                error: "403 - Le formulaire est clos",
            });
            return;
        }
        const currentDate = new Date();
        const closeDate = new Date(fullForm.creation_date);
        if (currentDate > closeDate) {
            res.status(403).json({
                error: `403 - Le formulaire est clos depuis le ${formatDate(
                    closeDate
                )}`,
            });
            return;
        }

        if (!fullForm.is_public) {
            res.status(403).json({
                error: "403 - Le formulaire n'est pas disponible pour le moment",
            });
            return;
        }

        // Build the securedFullForm without all the informations not needed in the front
        const {
            user_id,
            is_deployed,
            is_closed,
            is_public,
            theme_id,
            original_version_id,
            ...securedFullForm
        } = fullForm;
        res.status(200).json(securedFullForm);
    } catch (err) {
        next(err);
    }
};

// The A of BREAD - Add (Create) operation
export const createForm: RequestHandler = async (req, res, next) => {
    try { 
        // Extract the form data from the request body
        const {is_deployed, is_closed,  is_public, multi_answer, theme_id, form_name, user_id} = req.body

        const optionalFields: Partial<FormPayload> = {}
        if (typeof(req.body["date_to_close"])==="string"){optionalFields["date_to_close"]=req.body["date_to_close"]}
        if (typeof(req.body["form_description"])==="string"){optionalFields["form_description"]=req.body["form_description"]}

// Create the form
        const newForm = await insertForm({is_deployed, is_closed, is_public, multi_answer, theme_id, form_name, user_id, ...optionalFields}) 
        
        // Respond with HTTP 201 (Created) and the ID of the newly inserted form
        res.status(201).json(newForm)
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
