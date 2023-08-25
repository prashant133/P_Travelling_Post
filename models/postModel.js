
const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    description: {
        type: String,
        trim: true,
        default: "No Description for this post"
    },
    image: {
        type: String,
        trim: true,
        default: "default_image_url_here" 
    }
}, {
    timestamps: true 
})

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
