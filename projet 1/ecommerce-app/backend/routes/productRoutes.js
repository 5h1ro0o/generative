const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
  try {
    console.log('📦 Récupération des produits...');
    const products = await Product.find();
    console.log(`✅ ${products.length} produits trouvés`);
    res.json(products);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des produits:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du produit:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du produit', error: error.message });
  }
});

module.exports = router;