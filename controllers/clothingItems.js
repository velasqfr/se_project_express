const Item = require("../models/clothingItem");

//GET Items

const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

//POST Item
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) =>
      res.status(400).send({ message: "Invalid item data", err })
    );
};

//DELETE Item
const deleteItem = (req, res) => {
  Item.findByIdAndDelete(req.params.itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      return res.send({ message: "Item deleted successfully", item });
    })
    .catch((err) =>
      res.status(500).send({ message: "Error deleting item", err })
    );
};
module.exports = { getItems, createItem, deleteItem };
