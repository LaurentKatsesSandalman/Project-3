import express from "express";
import {
    createFormAnswers,
    getFormResultById,
} from "../controllers/answer.controller";

const router = express.Router();

router.post("/:id", createFormAnswers);
router.get("/:id", getFormResultById); // MUST ADD AUTH MIDDLEWARE BEFORE GOING LIVE

export default router;
