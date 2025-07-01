const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

router.get("/me", getCurrentUser); // route for get current loggged-in user /users/me

router.patch("/me", updateCurrentUser); // route for updating user

module.exports = router;
