const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv').config()

// Middleware function to check if the user is authenticated
const verifyUser = async (req, res, next) => {
    try {
        // Get the JWT token from the request headers
        const token = req.headers.authorization.split(' ')[1]; 

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        // Find the user based on the decoded token
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach the user object to the request for further use in routes
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed" });
    }
};


const verifyAdmin =  async(req , res , next) => {
    if(req.user && req.user.role === "admin"){

        next();
    }else {
        return res.status(400).json({message : "Access denied , You are not admin"})
    }

}

module.exports = {verifyUser, verifyAdmin};
