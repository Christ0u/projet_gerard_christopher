const db = require("../models");
const Products = db.products;

exports.get = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.setHeader('Content-Type', 'application/json');
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve products' });
  }
};
