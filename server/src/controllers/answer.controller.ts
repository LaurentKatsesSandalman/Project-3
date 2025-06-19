import type { RequestHandler } from "express";
import { findAllAnswers, findAnswerById } from "../models/answer.model";
import { AnsweredFormPayload } from "../types/answer";
import { addAnsweredForm } from "../services/addAnsweredForm";

// The B of BREAD - Browse (Read All) operation
export const getAllAnswers: RequestHandler = async (req: any, res, next) => {
    try {
        //Find form ID
        const formId = Number.parseInt(req.params.form_id);
        if (isNaN(formId)) {
            res.status(400).json({
                error: "L'id du formulaire est censée être numérique",
            });
            return;
        }
        // Fetch all items
        const answers = await findAllAnswers(formId);
        // Respond with the items in JSON format
        res.json(answers);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The R of BREAD - Read operation
export const getThisAnswer: RequestHandler = async (req: any, res, next) => {
    try {
        const answerId = Number.parseInt(req.params.id);
        if (isNaN(answerId)) {
            res.status(400).json({
                error: "L'id de la réponse est censée être numérique",
            });
            return;
        }
        // Fetch a specific answer based on the provided ID
        const answer = await findAnswerById(answerId);
        //respond with the field in JSON format
        res.json(answer);
    } catch (err) {
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The E of BREAD  -Edit operation <= People answering a form can't update their answer.

// The A of BREAD - Add (Create) operation
export const createFormAnswers: RequestHandler<
    {},
    {},
    AnsweredFormPayload
> = async (req, res, next) => {
    try {
        const answeredForm: AnsweredFormPayload = req.body;
        await addAnsweredForm(answeredForm);
        res.sendStatus(201);
    } catch (err: any) {
        if (err.message && err.message.startsWith("409")) {
            const notUniqueFieldId = err.message.split(":")[1];
            res.status(409).json({
                notUniqueFieldId: Number.parseInt(notUniqueFieldId),
            });
        }
        // Pass any errors to the error-handling middleware
        next(err);
    }
};

// The D of BREAD - Delete operation <= no, will be done through cascading
