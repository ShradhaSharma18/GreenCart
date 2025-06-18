const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch products' });
//   }
// });
router.get('/', async (req, res) => {
  const searchQuery = req.query.search || '';
  try {
    const products = await Product.find({
      name: { $regex: searchQuery, $options: 'i' }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});


// POST add a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add product', message: err.message });
  }
});

// GET better alternative product by ID
router.get('/:id/better-option', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (!product.alternative) {
      return res.status(404).json({ message: 'No better option available for this product' });
    }

    res.json(product.alternative); // return the nested alternative
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch better option', message: err.message });
  }
});

module.exports = router;
