const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");

//GET /users/me - get current loggged-in user
router.get("/me", getCurrentUser);

module.exports = router;
