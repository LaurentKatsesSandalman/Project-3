import type { RequestHandler } from "express";
import {
    findAllOptions,
    findOptionById,
    insertOption,
    deleteOptionById,
} from "../models/fieldoption.model";
import { FieldOption } from "../types/field";

// The B of BREAD - Browse (Read All) operation

export const getAllOptions: RequestHandler = async (req, res, next) => {
    try {
        //Find field ID
        const fieldId = Number.parseInt(req.params.field_id);
        if (isNaN(fieldId)) {
            res.status(400).json({
                error: "L'id du champ est censée être numérique",
            });
            return;
        }
        // Fetch all items
        const options = await findAllOptions(fieldId);
        // Respond with the items in JSON format
        res.json(options);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The R of BREAD - Read operation
export const getThisOption: RequestHandler = async (req, res, next) => {
    try {
        const optionId = Number.parseInt(req.params.id);
        if (isNaN(optionId)) {
            res.status(400).json({
                error: "L'id de l'option est censée être numérique",
            });
            return;
        }
        // Fetch a specific option based on the provided ID
        const option = await findOptionById(optionId);
        //respond with the field in JSON format
        res.json(option);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The A of BREAD - Add (Create) operation
export const createOption: RequestHandler = async (req, res, next) => {
    try {
        const { option_ordering, option_name, option_value, field_id } = req.body;

        // Create the field
        const newOption = await insertOption({
            option_ordering,
            option_name,
            option_value,
            field_id,
        } as FieldOption);
        res.status(201).json(newOption);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The D of BREAD - Delete operation
export const deleteOption: RequestHandler = async (req, res, next) => {
    try {
        const optionId = Number.parseInt(req.params.id);
        if (isNaN(optionId)) {
            res.status(400).json({
                error: "L'id option est censée être numérique",
            });
            return;
        }
        const result = await deleteOptionById(optionId);
        res.status(200).json(result);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};
