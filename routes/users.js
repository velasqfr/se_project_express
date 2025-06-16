const router = require("express").Router();
const { getUsers } = require("../controllers/users");

router.get("/", getUsers); //returns all users
router.get("/:userId", () => console.log("GET users by ID")); //returns a user by _id
router.post("/", () => console.log("POST users")); //creates a new user

module.exports = router;
