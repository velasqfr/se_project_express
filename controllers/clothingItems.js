const Item = require("../models/clothingItem");
/*const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVICE_ERROR,
  FORBIDDEN,
} = require("../utils/errors"); */

const {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServiceError,
} = require("../utils/errors");

// GET /items
const getItems = (req, res, next) => {
  Item.find({})
    .then((items) => res.status(200).json(items))
    .catch((err) => {
      console.error(err);
      next(new InternalServiceError("Failed to retrieve items"));
    });
};

// POST /items
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).json(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid item data"));
      }
      return next(new InternalServiceError("Internal Server Error"));
    });
};

// DELETE /items/:itemId
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          "Forbidden: Not authorized to delete this item"
        );
      }
      return Item.findByIdAndDelete(itemId).then(() =>
        res.json({ message: "Item deleted successfully", item })
      );
    })
    .catch((err) => {
      if (err instanceof NotFoundError || err instanceof ForbiddenError) {
        return next(err); // Pass along our custom errors
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid ID format"));
      }
      // Any other error
      console.error(err);
      return next(new InternalServiceError("Error deleting item"));
    });
};

// PUT /items/:itemId/likes — Like an item
const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
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
      if (err instanceof NotFoundError) {
        return next(err); // Pass along our custom errors
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid ID format"));
      }
      // Any other error
      console.error(err);
      return next(new InternalServiceError("Failed to like item"));
    });
};

// DELETE /items/:itemId/likes — Unlike an item
const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  Item.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
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
      if (err instanceof NotFoundError) {
        return next(err); // Pass along our custom errors
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid ID format"));
      }
      // Any other error
      console.error(err);
      return next(new InternalServiceError("Failed to dislike item"));
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
