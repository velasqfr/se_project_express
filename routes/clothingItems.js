const router = require("express").Router();

const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.post("/", createItem); // creates a new item
router.delete("/:itemId", deleteItem); // deletes an item by _id
router.put("/:itemId/likes", likeItem); // likes an item
router.delete("/:itemId/likes", dislikeItem); // unlikes an item

module.exports = router;
