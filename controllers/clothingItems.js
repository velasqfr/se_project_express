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
      return res.status(INTERNAL_SERVICE_ERROR).send({ message: err.message });
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
        return res.status(BAD_REQUEST).send({ message: "Invalid item data" });
      }
      return res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Internal Server Error", err });
    });
};

//DELETE /items/:itemId
const deleteItem = (req, res) => {
  Item.findByIdAndDelete(req.params.itemId)
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      return res.send({ message: "Item deleted successfully", item });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVICE_ERROR)
        .send({ message: "Error deleting item", err });
    });
};
module.exports = { getItems, createItem, deleteItem };
