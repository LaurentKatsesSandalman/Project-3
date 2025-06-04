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

router.get("/", authenticateToken, getAllUsers);  // TEMP, used for practice
router.post("/login", loginUserValidationRules, validate, loginUser);
router.post("/", createUserValidationRules, validate, createUser);
// router.get('/:id', getUserById);
// router.post('/', createUSer);
// delete
//put
//patch

export default router;
