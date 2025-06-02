import express from "express";
import cors from "cors";
import "dotenv/config";
import { logErrors } from "./middlewares/logErrors.ts";
import userRouter from "./routes/user.routes.ts";
import formRouter from "./routes/form.routes.ts";
import answerRouter from "./routes/answer.routes.ts";
import {
    createUserValidationRules,
    validate,
} from "./middlewares/user-validation.ts";

const app = express();

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Use cors to allow our client url (in env variables) to query our back
if (process.env.CLIENT_URL != null) {
    app.use(cors({ origin: process.env.CLIENT_URL }));
}

/* ************************************************************************* */
// Request Parsing (explications dans mono repo)
/* ************************************************************************* */

// DO NOT FORGET THIS LINE. Makes req.body available for JSON requests
app.use(express.json());

app.use("/api/forms", formRouter);
app.use("/api/users", userRouter);
app.use("/api/answers/", answerRouter);

// Mount the logErrors middleware globally
app.use(logErrors);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.info(`Server is listening on port ${port}`);
}).on("error", (err: Error) => {
    console.error("Error:", err.message);
});
