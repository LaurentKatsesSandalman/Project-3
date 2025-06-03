import express from "express";
import { createUser, getAllUsers } from "../controllers/user.controller";
import {
    createUserValidationRules,
    validate,
} from "../middlewares/user-validation";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUserValidationRules, validate, createUser);
// router.get('/:id', getUserById);
// router.post('/', createUSer);
// delete
//put
//patch

export default router;
