const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const { statusCode = 500, message = "An internal server error occurred" } =
    err;

  res.status(statusCode).json({
    message: statusCode === 500 ? "An internal server error occurred" : message,
  });
};

module.exports = errorHandler;
