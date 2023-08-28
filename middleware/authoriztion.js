const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv').config()

// Middleware function to check if the user is authenticated
const authMiddleware = async (req, res, next) => {
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

module.exports = authMiddleware;
