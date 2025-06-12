import type { RequestHandler } from "express";
import { FormType } from "../types/form";

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

        const form = await getAllForms.service.ts(parsedId);
        res.status(200).json(form);
    } catch (err) {
        next(err);
    }
};
