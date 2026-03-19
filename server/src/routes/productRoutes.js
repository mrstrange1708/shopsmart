const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Trending route MUST come before /:id to avoid param collision
router.get('/trending', productController.getTrendingProducts);

// Standard CRUD routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
