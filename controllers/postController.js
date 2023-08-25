const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');

const createPost = asyncHandler(async (req, res, next) => {
    try {
        const { description } = req.body;

        // Check if a file was uploaded and accepted by the file filter
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a valid image file (JPEG, JPG, PNG).' });
        }

        const newPost = new Post({
            description: description,
            image: req.file.path
        });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = createPost;
