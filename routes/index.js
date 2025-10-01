const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const { NotFoundError } = require("../errors");
const {
  validateCreateUser,
  validateLogInUser,
} = require("../middlewares/validation");

// Public Routes - 4. Add routes and controllers for signing up and signing in:
router.post("/signin", validateLogInUser, login);
router.post("/signup", validateCreateUser, createUser);
router.get("/items", require("../controllers/clothingItems").getItems);

// Authorization Middleware - protects the route below
router.use(auth);

// Now /items and /users require auth
router.use("/items", itemRouter);
router.use("/users", userRouter);

// Fallback for undefined routes — centralized error handling
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
