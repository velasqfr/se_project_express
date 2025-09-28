const { ConflictError } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  console.error(err.stack);

  // Handle invlaid MongoDB ObjectId (CastError)
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  // Handle duplicate key error (e.g., email already exists)
  if (err.code === 11000) {
    return next(new ConflictError("User with this email already exist"));
  }

  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    message: statusCode === 500 ? "An internal server error occurred" : message,
  });
};
