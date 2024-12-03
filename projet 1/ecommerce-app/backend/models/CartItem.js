// backend/models/CartItem.js
const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  user: { 
    type: String, // Changer ObjectId en String
    required: true 
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

module.exports = mongoose.model('CartItem', CartItemSchema);