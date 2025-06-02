import express from "express";

import { getAllForms, getThisForm, createForm, deleteForm } from "./../controllers/form.controller.ts"

const router = express.Router();

router.get("/:user_id/",getAllForms);
router.get("/:user_id/:id",getThisForm)
router.post("/:user_id/", createForm)
router.delete("/:user_id/id",deleteForm)
//put
//patch
//...

export default router;