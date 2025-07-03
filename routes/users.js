const router = require("express").Router();
const {
  getCurrentUser,
  updateCurrentUser,
  getUsers,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use(auth);

router.get("/", getUsers); // GET /users - get all users
router.get("/me", getCurrentUser); // route for get current loggged-in user /users/me

router.patch("/me", updateCurrentUser); // route for updating user

module.exports = router;
