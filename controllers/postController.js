const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const mongoose = require('mongoose')
const {fileFilter} = require('../utils/fileUpload')


// create a post
const createPost = asyncHandler(async (req, res, next) => {
    try {
        const { description } = req.body;

        // Check if a file was uploaded and accepted by the file filter
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a valid image file (JPEG, JPG, PNG).' });
        }

        if(description.length > 500) {
            res.status(400).json({message : "Not more than 500"})

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

// to get all the post 

const getAllPost = asyncHandler(async(req ,res , next)=>{
    res.send("get all post")

})


// get post from post id


const getPost = asyncHandler(async (req, res, next) => {
    const postId = req.params.id;

    if (!mongoose.isValidObjectId(postId)) {
        return res.status(400).json({ message: "Invalid post ID " });
    }

    try {
        const post = await Post.findById(postId);

      
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// update post

const updatePost = asyncHandler(async (req, res, next) => {
    try {
        const { description } = req.body;
        const { id } = req.params;

        // Find the post by id
        const post = await Post.findById(id);

        // Check if the post is present in the database
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Update the post's description if provided
        if (description) {
            // Check if the updated description length is within your requirements
            if (description.length > 500) {
                return res.status(400).json({ message: 'Description must not exceed 500 characters' });
            }
            post.description = description;
        }

    // check the validity of the file uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a valid image file (JPEG, JPG, PNG).' });
        }
        // update the image path 
        post.image = req.file.path;

        // Save the updated post
        const updatedPost = await post.save();

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});






module.exports = {createPost, getAllPost, getPost, updatePost}
