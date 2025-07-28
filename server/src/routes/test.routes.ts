import express from "express";

import {
    seedDatabase
} from "./../controllers/test.controller";

const router = express.Router();

router.post("/seed",seedDatabase);

export default router;