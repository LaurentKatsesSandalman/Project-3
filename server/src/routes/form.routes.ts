import express from "express";

import { getAllForms, getThisForm, createForm, deleteForm } from "./../controllers/form.controller.ts"

const router = express.Router();

router.get("/",getAllForms);
router.get("/:id",getThisForm)
router.post("/", createForm)
router.delete("/:id",deleteForm)
//put
//patch
//...

export default router;