import { app } from "./app";

// Get the port from the environment variables
const port = process.env.APP_PORT;

console.log(`[SERVER] ENV: ${process.env.NODE_ENV}`);
console.log(`[SERVER] DB: ${process.env.DB_NAME}`);


// Start the server and listen on the specified port
app.listen(port, () => {
    console.info(`Server is listening on port ${port}`);
}).on("error", (err: Error) => {
    console.error("Error:", err.message);
});
