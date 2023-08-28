
const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    description: {
        type: String,
        trim: true,
        maxlength : [500, "description must not exceed more than 10 character"]
    },
    image: {
        type: String,
        trim: true,
        required : [true,"please add a image"],
    }
}, {
    timestamps: true 
})

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
