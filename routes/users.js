const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

router.get("/", getUsers); // returns all users
router.get("/:userId", getUser); // returns a user by _id
router.post("/", createUser); // creates a new user

module.exports = router;
