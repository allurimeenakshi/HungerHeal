const express = require("express");
const donateApp = express.Router();
const expressAsyncHandler = require("express-async-handler");

// Middleware to parse JSON requests
donateApp.use(express.json());

// Fetch all donations
donateApp.get("/donations", expressAsyncHandler(async (req, res) => {
    console.log("Received GET request to /donations");

    const donationsCollection = req.app.get("donationsCollection");
    if (!donationsCollection) {
        console.error("donationsCollection is undefined");
        return res.status(500).json({ message: "Database error" });
    }

    const donations = await donationsCollection.find().toArray();
    res.status(200).json(donations);
}));

// Submit a food donation
donateApp.post("/donate", expressAsyncHandler(async (req, res) => {
    console.log("Received POST request to /donate");

    const donationsCollection = req.app.get("donationsCollection");
    if (!donationsCollection) {
        return res.status(500).json({ message: "Database error" });
    }

    const { foodName, quantity, expiryDate, pickupAddress, foodType, pickupTime, notes, contactNumber } = req.body;
    if (!foodName || !quantity || !expiryDate || !pickupAddress || !foodType || !pickupTime || !contactNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newDonation = {
        foodName,
        quantity,
        expiryDate,
        pickupAddress,
        foodType,
        pickupTime,
        notes: notes || "", // Optional field
        contactNumber, // Renamed to match frontend
        status: "Pending",
        createdAt: new Date(),
    };

    console.log("New Donation:", newDonation);

    const result = await donationsCollection.insertOne(newDonation);
    if (!result.acknowledged) {
        return res.status(500).json({ message: "Failed to submit donation" });
    }

    res.status(201).json({ message: "Food donation submitted successfully!" });
}));

module.exports = donateApp;
