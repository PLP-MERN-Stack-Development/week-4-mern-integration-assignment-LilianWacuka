const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

// Get all posts (public)
router.get('/', postController.getPosts);
// Get a specific post by ID (public)
router.get('/:id', postController.getPostById);
// Create a new post (protected)
router.post('/', auth, postController.addPost);
// Update an existing post (protected)
router.put('/:id', auth, postController.updatePost);
// Delete a post (protected)
router.delete('/:id', auth, postController.deletePost);

module.exports = router;