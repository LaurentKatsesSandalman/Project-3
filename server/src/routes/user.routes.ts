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

// TEMP, Remove when real route using authenticateToken is available
router.get("/", authenticateToken, getAllUsers);
// TEMP END

router.post("/login", loginUserValidationRules, validate, loginUser);
router.post("/", createUserValidationRules, validate, createUser);
//delete
//put
//patch

export default router;
