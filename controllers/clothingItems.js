const Item = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVICE_ERROR,
} = require("../utils/errors");

//GET /items
const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Failed to retrieve users", error: err.message });
    });
};

//POST /items
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid item data", error: err.message });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Internal Server Error", error: err.message });
    });
};

//DELETE /items/:itemId
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  return Item.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then(() => Item.findByIdAndDelete(itemId))
    .then((deletedItem) =>
      res.send({ message: "Item deleted successfully", item: deletedItem })
    )
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid ID format", error: err.message });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Error deleting item", error: err.message });
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
        { $pull: { likes: req.user._id } },
        { new: true }
      )
    )
    .then((updatedItem) => res.send(updatedItem))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid ID format", error: err.message });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Error unliking item", error: err.message });
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
        { $pull: { likes: req.user._id } },
        { new: true }
      )
    )
    .then((updatedItem) => res.send(updatedItem))
    .catch((err) => {
      console.error(err);
      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid ID format", error: err.message });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Error unliking item", error: err.message });
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
