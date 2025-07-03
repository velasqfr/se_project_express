const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

// GET /users/me - get current user info
router.get("/me", getCurrentUser);

// PATCH /users/me - update current user info
router.patch("/me", updateCurrentUser);

module.exports = router;
