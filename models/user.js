const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value); // retunring a Boolean
      },
      message: "You must enter a valid URL",
    },
  }, // 1. Expand the user schema: Email & Password
  email: {
    type: String,
    required: [true, "Email is required "],
    unique: true, // required for 11000 conflict error
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    select: false, // 8. Add a controller and route to modify the user data
    // Ensures the password won't be returned in queries by default
    // UNLESS explicitly asked for, which protects user data by default.
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password") // Ensure password is selected
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email address or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new Error("Incorrect email address or password")
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
