import express from "express";
import {
    createUser,
    getAllUsers,
    loginUser,
} from "../controllers/user.controller";
import {
    createUserValidationRules,
    loginUserValidationRules,
    validate,
} from "../middlewares/user-validation";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = express.Router();

// TEMP, used as an exemple
router.get("/", authenticateToken, getAllUsers);

router.post("/login", loginUserValidationRules, validate, loginUser);
router.post("/", createUserValidationRules, validate, createUser);
//delete
//put
//patch

export default router;
