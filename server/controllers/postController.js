const Posts = require('../models/Post');

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Posts.find()
            .populate('category', 'name')
            .populate('user', 'username email')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
            .populate('category', 'name')
            .populate('user', 'username email');
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new post
exports.addPost = async (req, res) => {
    try {
        const post = await Posts.create({
            ...req.body,
            user: req.body.user // Should be set from auth middleware in a real app
        });
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update an existing post
exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await Posts.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};