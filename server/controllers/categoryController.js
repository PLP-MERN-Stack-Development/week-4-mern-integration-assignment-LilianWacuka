const Category = require('../models/Category');

//create a new post with category
exports.addCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
//get all posts with category
exports.getCategory = async (req, res) => {
    try {
        const category = await Category.find()
          .populate('post', 'name')
          .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//get a single post by ID with category
exports.getCategoryById = async (req, res) =>{
    const category = await Posts.find({ user: req.user,id});
    try {
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//update a post by ID
exports.updateCategory = async (req, res) =>{
    
    try {
        constupdatedCategory = await Posts.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: 'category not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
    
};
//delete a post by ID
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Posts.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        // Check if user owns the post or is admin
        if (category.owner.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to delete this post" });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "post deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};