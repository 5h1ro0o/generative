// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const authMiddleware = require('../middleware/authMiddleware');

// Add item to cart
router.post('/', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;
  const cartItem = new CartItem({ product: productId, quantity, user: userId });
  await cartItem.save();
  res.status(201).json(cartItem);
});

// Remove item from cart
router.delete('/:id', authMiddleware, async (req, res) => {
  const cartItem = await CartItem.findByIdAndDelete(req.params.id);
  res.json(cartItem);
});

// Get user's cart
router.get('/user/:userId', authMiddleware, async (req, res) => {
  const cartItems = await CartItem.find({ user: req.params.userId }).populate('product');
  res.json(cartItems);
});

module.exports = router;