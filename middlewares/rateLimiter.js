const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // windowMs defines the time window for rate limiting (15 minutes here)
  max: 100, // limit each IP to 100 request per windowMs
  message: "Too many requests from this IP, please try again in 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = limiter;
