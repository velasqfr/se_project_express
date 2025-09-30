module.exports = (err, req, res, next) => {
  console.error(err.stack);

  // 1. Handle invalid MongoDB ObjectId (CastError)
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  // 2. Handle duplicate key error (e.g., email already exists)
  if (err.code === 11000) {
    return res
      .status(409)
      .json({ message: "User with this email already exist" });
  }

  // 3. If it's a custom error w/ a statusCode, respond accordingly
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // 4. Fallback: Unexpected server error
  res.status(500).json({ message: "An internal server error occurred" });
};
