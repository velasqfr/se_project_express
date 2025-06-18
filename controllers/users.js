const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVICE_ERROR,
} = require("../utils/errors");

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Invalid user data", error: err.message });
    });
};

// POST /users

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      } 
        return res
          .status(INTERNAL_SERVICE_ERROR)
          .send({ message: "Invalid user data", error: err.message });
      
    });
};

// Get /users/:userID

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))

    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "User not found", error: err.message });
      } if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Failed to retrieve user", error: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
