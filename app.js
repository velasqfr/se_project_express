const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

//the listen method can accept 2 parameters -> (the port number, an anomynouse callback function)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
