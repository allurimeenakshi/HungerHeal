const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Mongoose model
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) return res.status(400).json({ error: "Invalid credentials" });

        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
});

module.exports = router;
