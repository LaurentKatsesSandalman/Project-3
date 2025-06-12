import express from "express";
import { getFormById } from "../controllers/answer.controller";

const router = express.Router();

router.get("/:form_id", getFormById);
// router.post("/:id", postAnsweredForm);

export default router;
