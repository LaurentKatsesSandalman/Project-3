import express from "express";

import {
    getAllFields,
    getThisField,
    createField,
    updateThisField,
    deleteField,
} from "./../controllers/field.controller";

const router = express.Router();

router.get("/:form_id/", getAllFields);
router.get("/:form_id/:id", getThisField);
router.post("/:form_id/", createField);
router.put("/:form_id/:id", updateThisField);
router.delete("/:form_id/:id", deleteField);

export default router;
