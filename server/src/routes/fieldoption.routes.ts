import express from "express";

import {
    getAllOptions,
    getThisOption,
    createOption,
    deleteOption,
} from "../controllers/fieldoption.controller.ts";

const router = express.Router();


router.get("/:field_id/", getAllOptions);
router.get("/:field_id/:id", getThisOption);
router.post("/:field_id/", createOption);
router.delete("/:field_id/:id", deleteOption);


export default router;
