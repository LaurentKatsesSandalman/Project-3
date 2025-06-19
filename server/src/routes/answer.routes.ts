import express from "express";
import { createFormAnswers } from "../controllers/answer.controller";

const router = express.Router();

router.post("/:id", createFormAnswers);

export default router;
