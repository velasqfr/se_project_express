const router = require("express").Router();

const user = require("../models/user");
const userRouter = require("./users");

router.use("/users", userRouter);

module.exports = router;
