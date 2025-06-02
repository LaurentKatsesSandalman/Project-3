import express from "express";

import {
    getAllFields,
    getThisField,
    createField,
    updateThisField,
    deleteField,
} from "./../controllers/field.controller.ts";

const router = express.Router();


router.get("/:user_id/form_id/", getAllFields);
router.get("/:user_id/form_id/:id", getThisField);
router.post("/:user_id/form_id/", createField);
router.put("/:user_id/form_id/:id", updateThisField);
router.delete("/:user_id/id", deleteField);


export default router;
