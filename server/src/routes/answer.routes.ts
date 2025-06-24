import express from "express";
import {
    createFormAnswers,
    getFormResultById,
} from "../controllers/answer.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = express.Router();

router.post("/:id", createFormAnswers);
router.get("/:id", authenticateToken, getFormResultById); // MUST ADD AUTH MIDDLEWARE BEFORE GOING LIVE

export default router;
