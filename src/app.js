// app.js  do two  work server instance  creation and server config
// congin = Which middleware we connect , type of api also
const express = require('express'); // Importing express for server creation
const cookieParser = require('cookie-parser'); // Importing cookie-parser to handle browser cookies
const authRouter = require("./routes/auth.routes"); // Importing authentication routes
const app = express(); // Initializing the express application instance

app.use(express.json()); // Middleware to parse incoming JSON request bodies
app.use(cookieParser()); // Middleware to parse and handle cookies sent by the client
app.use('/api/auth', authRouter); // Connecting authentication routes to the /api/auth path

module.exports = app; // Exporting the configured express app instance