import express from "express";

const app = express();

/* ************************************************************************* */
// Installer et utiliser CORS (copié depuis mono repo ):

// import cors from "cors";

// if (process.env.CLIENT_URL != null) {
//   app.use(cors({ origin: [process.env.CLIENT_URL] }));
// }
/* ************************************************************************* */
// Request Parsing (explications dans mono repo)
/* ************************************************************************* */

import router from "./router";

app.use(router);

// Cette partie est déportée sur le router :
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//Cette partie est déportée dans main
// const port = 3310;

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

/* ************************************************************************* */

// Middleware for Error Logging
// Important: Error-handling middleware should be defined last, after other app.use() and routes calls.

import type { ErrorRequestHandler } from "express";

// Define a middleware function to log errors
const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  // Log the error to the console for debugging purposes
  console.error(err);
  console.error("on req:", req.method, req.path);

  // Pass the error to the next middleware in the stack
  next(err);
};

// Mount the logErrors middleware globally
app.use(logErrors);

/* ************************************************************************* */

export default app;
