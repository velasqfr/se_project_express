const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateUpdateUser } = require("../middlewares/validation");

// GET /users/me - get current user info
router.get("/me", getCurrentUser);

// PATCH /users/me - update current user info
router.patch("/me", validateUpdateUser, updateCurrentUser);

module.exports = router;
