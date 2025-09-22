const router = require("express").Router();

const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const {
  validateClothingItem,
  validateIdParam,
} = require("../middlewares/validation");

router.post("/", validateClothingItem, createItem); // creates a new item
router.delete("/:itemId", validateIdParam, deleteItem); // deletes an item by _id
router.put("/:itemId/likes", validateIdParam, likeItem); // likes an item
router.delete("/:itemId/likes", validateIdParam, dislikeItem); // unlikes an item

module.exports = router;
