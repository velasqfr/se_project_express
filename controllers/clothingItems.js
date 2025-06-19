const Item = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVICE_ERROR,
} = require("../utils/errors");

// GET /items
const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Failed to retrieve items" });
    });
};

// POST /items
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item data" });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Internal Server Error" });
    });
};

// DELETE /items/:itemId
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  return Item.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((deletedItem) =>
      res.send({ message: "Item deleted successfully", item: deletedItem })
    )
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Error deleting item" });
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
    .then((updatedItem) => res.send(updatedItem))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Failed to like item" });
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
    .then((updatedItem) => res.send(updatedItem))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Error unliking item" });
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
