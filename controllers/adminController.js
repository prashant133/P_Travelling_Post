const mongoose = require("mongoose");
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');



const defaultAdmin = asyncHandler(async (req, res) => {
    try {
        // check for admin
        const existingAdmin = await User.findOne({
            $or: [{ username: "admin" }, { email: "admin@gmail.com" }]
        });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // if not exits create an admin
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const adminUser = new User({
            username: "admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        });

        await adminUser.save();
        

        return res.status(201).json({ message: 'Default admin user created successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = defaultAdmin