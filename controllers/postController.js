const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const mongoose = require('mongoose')


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


module.exports = {createPost, getAllPost, getPost}
