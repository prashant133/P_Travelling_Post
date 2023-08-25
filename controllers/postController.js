
const asyncHandler = require("express-async-handler")
const Post = require('../models/postModel')


const createPost = asyncHandler(async(req ,res , next)=> {
    res.send("post page")
})

module.exports = createPost