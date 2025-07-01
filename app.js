const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

/* Remove the hard-coded user object since we have our own authorization set up
app.use((req, res, next) => {
  req.user = {
    _id: "6851e5168dcc718b94e0b4d3",
  };
  next();
}); */

app.use(express.json());
// app.use allows us to register routes & middleware
// ("/") -> the root route
app.use("/", indexRouter); // Mounting the users & item Router

// the listen method can accept 2 parameters -> (the port number, an anomynouse callback function)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
