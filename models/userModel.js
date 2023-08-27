const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username : {
        type :  String,
        trim : true,
        required : true,
        maxlength : [10, "username must not exceed more than 10 character"],
        minlength : [3, "username must be of minimum 3 character"],
    },

    email : {
        type : String ,
        trim : true,
        required : [true,"please add a email"],

    }, 
    password : {
        type : String ,
        required : [true,"please add a password"],
        minLength : [6,"Password must be upto 6 characters"],
    },

    is_admim : {
        type :Boolean
    }
})