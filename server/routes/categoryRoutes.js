const express = require('express');
const router = express.Router();
const {getCategory, addCategory, updateCategory, deleteCategory} =require('../controllers/categoryController');

router.post('/', addCategory);
router.get('/', getCategory);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
