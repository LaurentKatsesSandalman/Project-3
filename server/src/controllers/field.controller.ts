import type { RequestHandler } from "express";
import { findAllFields, findFieldById, insertField, updateField, deleteFieldById} from "../models/field.model";

// The B of BREAD - Browse (Read All) operation

export const getAllFields: RequestHandler = async (req, res, next) => {
    try {
        //Find form ID
        const formId = Number.parseInt(req.params.form_id);
        if (isNaN(formId)) {
            res.status(400).json({ error: 'L\'id du formulaire est censée être numérique' });
            return;
        }
        // Fetch all items
        const fields= await findAllFields(formId);
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
        const fieldId = Number.parseInt(req.params.id)
        if (isNaN(fieldId)) {
            res.status(400).json({ error: 'L\'id du champ est censée être numérique' });
            return;
        }
        // Fetch a specific field based on the provided ID: field
        const field = await findFieldById(fieldId);
        //respond with the field in JSON format
        res.json(field);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The A of BREAD - Add (Create) operation
export const createField: RequestHandler = async (req, res, next) => {
    try {
        const { ordering, name, description, defaultValue, isRequired, isUnique, formId, fieldTypeId } = req.body
        
        // Create the field
        const newField = await insertField({ ordering, name, description, defaultValue, isRequired, isUnique, formId, fieldTypeId })
        res.status(201).json(newField)
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

//The U of BREAUD (lol) - Update operation
export const updateThisField: RequestHandler = async (req, res, next) => {
    try {
        const { id, ordering, name, description, defaultValue, isRequired, isUnique, formId, fieldTypeId } = req.body
        const updatedField = await updateField({ id, ordering, name, description, defaultValue, isRequired, isUnique, formId, fieldTypeId })
        res.status(200).json(updatedField)
    } catch (err) {
        next(err);
    }
};

// The D of BREAD - Delete operation
export const deleteField: RequestHandler = async (req, res, next) => {
    try {        
        const fieldId = Number.parseInt(req.params.id)
        if (isNaN(fieldId)) {
            res.status(400).json({ error: 'L\'id du champ est censée être numérique' });
            return;
        }
    const result = await deleteFieldById(fieldId)
    res.status(200).json(result)
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};


