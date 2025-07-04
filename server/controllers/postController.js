const Posts = require('../models/Post');
const { post } = require('../server');

//Create a new post
exports.addPosts = async (req, res) => {
    try {
        const post = await Posts.create({
            ...req.body,
            user: req.body.author // Use author from request body
        });
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//GET a single post by ID
exports.getPostsById = async (req, res) => {
    const post = await Posts.find({ user: req.user,id});
    try {
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET all posts
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

//update an existing post
exports.updatePosts = async (req, res) =>{
    
    try {
        const updatedPost = await Posts.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
    
};
//delete a post
exports.deletePosts = async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        // Check if user owns the post or is admin
        if (post.owner.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to delete this task" });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};