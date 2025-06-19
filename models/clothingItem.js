const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v); //Uses validator.isURL() for solid URL checking
      },
      message: "Invalid URL format",
    },
  },
  owner: {
    //ObjectId, references user
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    default: [], // default: [] ensures it's an empty array by default.
  },
  createdAt: {
    //utomatically stores creation timestamp
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("item", clothingItemSchema);
