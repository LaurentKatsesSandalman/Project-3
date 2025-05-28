import express from "express";
import "dotenv/config";
import userRouter from './routes/user.routes.ts';
import formRouter from './routes/form.routes.ts';
import answerRouter from './routes/answer.routes.ts';
import { logErrors } from "./middlewares/logErrors.ts";

const app = express();
// Get the port from the environment variables
const port = process.env.APP_PORT;

/* ************************************************************************* */
// Installer et utiliser CORS (copié depuis mono repo ):

// import cors from "cors";

// if (process.env.CLIENT_URL != null) {
//   app.use(cors({ origin: [process.env.CLIENT_URL] }));
// }
/* ************************************************************************* */
// Request Parsing (explications dans mono repo)
/* ************************************************************************* */

app.use("/api/forms",formRouter);
app.use("/api/users",userRouter);
app.use("/api/answers/",answerRouter);

/* ************************************************************************* */
// Mount the logErrors middleware globally
app.use(logErrors);

/* ************************************************************************* */



// Start the server and listen on the specified port
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err: Error) => {
    console.error("Error:", err.message);
  });
