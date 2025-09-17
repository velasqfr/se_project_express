const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
require("dotenv").config();

const indexRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

// Use Helmet for basic security
app.use(helmet());

// Connect to MongoDb
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

// Middleware
// 11. Install cors: this package will allow requests from the client to the server to be processed
app.use(cors());
app.use(express.json());
// app.use allows us to register routes & middleware
// ("/") -> the root route

// Request Logger BEFORE routes
app.use(requestLogger);

// Main Route
app.use("/", indexRouter); // Mounting the users & item Router

// Error Logger AFTER routes, BEFORE error handlers
app.use(errorLogger);

// Celebrate error handler
app.use(errors());

// Centralized Error Handler — register this AFTER routes
app.use(errorHandler);

// Start Server
// the listen method can accept 2 parameters -> (the port number, an anonymous callback function)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
