import express from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./routes/user.routes";
import formRouter from "./routes/form.routes";
import answerRouter from "./routes/answer.routes";
import fieldRoute from "./routes/field.routes";
import optionRoute from "./routes/fieldoption.routes";
import { logErrors } from "./middlewares/logErrors";

export const app = express();

// Use cors to allow our client url (in env variables) to query our back
if (process.env.CLIENT_URL != null) {
    app.use(cors({ origin: process.env.CLIENT_URL }));
}

// Request Parsing (explications dans mono repo)
app.use(express.json());

app.get("/", (req, res) => {
    res.send("WELCOME dzqd QadazqzdqzddUICKY");
});

app.get("/test", (req, res) => {
    res.send("AZDZADADZICKDY");
});

app.use("/api/users", userRouter);
app.use("/api/forms", formRouter);
app.use("/api/answers", answerRouter);

// Might not be needed
app.use("/api/fields", fieldRoute);
app.use("/api/options", optionRoute);

// Mount the logErrors middleware globally
app.use(logErrors);
