const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authoriztion')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()


// registration of the user
const registerUser = asyncHandler(async (req, res, next) => {
    const { username, password, email } = req.body;

    // Validation
    if (!username || !password || !email) {
        return res.status(400).json({ message: "Please provide all the credentials" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (username.length < 3) {
        return res.status(400).json({ message: "Username must be at least 3 characters long" });
    }

    if (username.length > 10) {
        return res.status(400).json({ message: "Username must be less than 10 characters" });
    }

    // Checking for existing user
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
        if (userExists.email === email) {
            return res.status(400).json({ message: "Email already exists" });
        } else {
            return res.status(400).json({ message: "Username already exists" });
        }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        // Save the user
        const savedUser = await newUser.save();

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while creating the user" });
    }
});

// login of the user or admin
const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // Validation
        if (!username || !password) {
            return res.status(400).json({ message: "Please provide credentials" });
        }

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Wrong credentials" });
        }

        // Compare the password with hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({ message: "Wrong credentials" });
        }

        // Depending on the user's role, you can set up different responses
        let roleMessage = "";
        if (user.role === "admin") {
            roleMessage = "Admin login successful";
        } else {
            roleMessage = "User login successful";
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        return res.status(200).json({ message: roleMessage, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};










module.exports = {registerUser, loginUser}
