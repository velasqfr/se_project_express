const { INTERNAL_SERVICE_ERROR } = require("../utils/errors");

class InternalServiceError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = INTERNAL_SERVICE_ERROR;
  }
}

module.exports = InternalServiceError;
