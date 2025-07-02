const Item = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVICE_ERROR,
  FORBIDDEN,
} = require("../utils/errors");

// GET /items
const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(200).json(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .json({ message: "Failed to retrieve items" });
    });
};

// POST /items
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).json({ message: "Invalid item data" });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .json({ message: "Internal Server Error" });
    });
};

// DELETE /items/:itemId
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return res
          .status(FORBIDDEN)
          .json({ message: "Forbidden: Not authorized to delete this item" });
      }
      return Item.findByIdAndDelete(itemId).then(() =>
        res.json({ message: "Item deleted successfully", item })
      );
    })
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).json({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .json({ message: "Error deleting item" });
    });
};

// PUT /items/:itemId/likes — Like an item
const likeItem = (req, res) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then(() =>
      Item.findByIdAndUpdate(
        itemId,
        { $addToSet: { likes: req.user._id } }, // likeItem uses $addToSet to add a user ID to the likes array (and prevents duplicates)
        { new: true }
      )
    )
    .then((updatedItem) => res.json(updatedItem))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).json({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .json({ message: "Failed to like item" });
    });
};

// DELETE /items/:itemId/likes — Unlike an item
const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then(() =>
      Item.findByIdAndUpdate(
        itemId,
        { $pull: { likes: req.user._id } }, // dislikeItem uses $pull to remove a user ID from the likes arra
        { new: true }
      )
    )
    .then((updatedItem) => res.json(updatedItem))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).json({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .json({ message: "Error unliking item" });
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
