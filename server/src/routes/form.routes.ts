import express from "express";

import {
    getAllForms,
    getThisForm,
    createForm,
    deleteForm,
} from "./../controllers/form.controller.ts";
import { authenticateToken } from "../middlewares/authenticateToken.ts";

const router = express.Router();

router.get("/", authenticateToken, getAllForms);
router.get("/:id", authenticateToken, getThisForm);
router.post("/", authenticateToken, createForm);
router.delete("/id", authenticateToken, deleteForm);

//put
//patch
//...

export default router;
