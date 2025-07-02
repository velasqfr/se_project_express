const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");

// Public Routes
router.post("/signin", login);
router.post("/signup", createUser);

// Authorization Middleware - protects the route below
router.use(auth);

// Now /items and /users require auth
router.use("/items", itemRouter);
router.use("/users", userRouter);

// Fallback for undefines routes
router.use((req, res) => {
  res.status(NOT_FOUND).json({ message: "Router not found" });
});

module.exports = router;
