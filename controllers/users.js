const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
/* const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVICE_ERROR,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/errors"); */

const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  InternalServiceError,
} = require("../errors");

// POST /users - 2. Update the createUser controller
const createUser = (req, res, next) => {
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
        return next(new ConflictError("Email already in use"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid user data"));
      }
      return next(new InternalServiceError("Failed to create user"));
    });
};

// 7. Update the GET /users/:id route
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id; // get current user ID from auth middleware

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.error(err);
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID format"));
      }
      return next(new InternalServiceError("Failed to retrieve user"));
    });
};

// POST /Login Controller - 3. Create the login controller
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      const userResponse = user.toObject();
      delete userResponse.password;

      return res.json({ token, user: userResponse });
    })
    .catch((err) => {
      console.error(err);
      // If credentials are incorrect, pass UnauthorizedError
      if (
        err.name === "AuthError" ||
        err.message === "Incorrect email or password"
      ) {
        return next(new UnauthorizedError("Incorrect email or password"));
      }

      return next(new InternalServiceError("Failed to login user"));
    });
};

// PATCH /users/me — update profile - 8. Add a controller and route to modify the user data:
const updateCurrentUser = (req, res, next) => {
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
      throw new NotFoundError("User not found");
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.error(err);
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data for user update"));
      }
      return next(new InternalServiceError("Failed to update user"));
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
