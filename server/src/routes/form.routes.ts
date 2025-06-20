import express from "express";

import {
    getAllForms,
    getFullFormById,
    createForm,
    deleteForm,
    getSecuredFullFormById,
} from "./../controllers/form.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = express.Router();

router.get("/", authenticateToken, getAllForms);
router.get("/:id", authenticateToken, getFullFormById);
router.get("/answerable/:id", getSecuredFullFormById);
router.post("/", authenticateToken, createForm);
router.delete("/:id", authenticateToken, deleteForm);

//put
//patch
//...

export default router;
