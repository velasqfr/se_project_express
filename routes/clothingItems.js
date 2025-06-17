const router = require("express").Router();

const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");

router.get("/", getItems); //returns all clothing items
router.post("/", createItem); //creates a new item
router.delete("/:itemId", deleteItem); //deletes an item by _id

module.exports = router;
