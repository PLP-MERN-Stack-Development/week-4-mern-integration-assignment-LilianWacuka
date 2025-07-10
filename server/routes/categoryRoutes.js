const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

// Get all categories (public)
router.get('/', categoryController.getCategories);
// Get a specific category by ID (public)
router.get('/:id', categoryController.getCategoryById);
// Create a new category (protected)
router.post('/', auth, categoryController.addCategory);
// Update a category (protected)
router.put('/:id', auth, categoryController.updateCategory);
// Delete a category (protected)
router.delete('/:id', auth, categoryController.deleteCategory);

module.exports = router;
