const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVICE_ERROR,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/errors");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .json({ message: "Failed to retrieve users" });
    });
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword })
    )
    .then((user) => {
      const userResponse = user.toObject();
      delete userResponse.password; // remove sensitive info
      return res.status(201).json(userResponse);
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return res.status(CONFLICT).json({ message: "Email already in use" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).json({ message: "Invalid user data" });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .json({ message: "Failed to create user" });
    });
};

// Updated: GET /users/me
const getCurrentUser = (req, res) => {
  const userId = req.user._id; // get current user ID from auth middleware

  User.findById(userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).json({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Invalid user ID format" });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .json({ message: "Failed to retrieve user" });
    });
};

// POST /Login Controller
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email address or password") {
        return res
          .status(UNAUTHORIZED)
          .json({ message: "Incorrect email or password" });
      }
      console.error(err);
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .json({ message: "An error has occurred on the server" });
    });
};

// PATCH /users/me — update profile
const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    {
      new: true, // returns the updated document
      runValidators: true, // ensures schema validation runs
    }
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Invalid data for user update" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).json({ message: "User Not Found" });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .json({ message: "Failed to update user" });
    });
};

module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
