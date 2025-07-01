const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");

// Public Routes
router.post("/signin", login);
router.post("/signup", createUser);
router.use("/items", itemRouter);

// Authorization Middleware - protects the router below
router.use(auth);

// Protected Route
router.use("/users", userRouter);

// Fallback for undefines routes
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
