const router = require("express").Router();

const user = require("../models/user");
const userRouter = require("./users");
const itemRoutes = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", itemRoutes);

module.exports = router;
