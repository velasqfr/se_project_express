const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const indexRouter = require("./routes/index");

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

// Main Route
app.use("/", indexRouter); // Mounting the users & item Router

// Start Server
// the listen method can accept 2 parameters -> (the port number, an anonymous callback function)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
