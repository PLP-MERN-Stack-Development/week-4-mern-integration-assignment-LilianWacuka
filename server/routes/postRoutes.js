const express = require( 'express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');
const {getPosts, addPosts, updatePosts, deletePosts} = require('../controllers/postController');

router.get('/', getPosts);
router.get('/:id', getPosts);
router.post('/', addPosts);
router.put('/:id', updatePosts);
router.delete('/', deletePosts);

module.exports = router;