const express = require("express");
const trackApp = express.Router();
const { ObjectId } = require("mongodb");

// Middleware
trackApp.use(express.json());

// Fetch collections from app
trackApp.use((req, res, next) => {
    req.trackCollection = req.app.get("trackCollection");
    next();
});

// Add a new tracking entry
trackApp.post("/add", async (req, res) => {
    try {
        const { trackingId, donationId, donorId, recipientId, currentLocation, destination, status } = req.body;
        const newTrack = { trackingId, donationId, donorId, recipientId, currentLocation, destination, status, updatedAt: new Date() };
        await req.trackCollection.insertOne(newTrack);
        res.status(201).send({ message: "Tracking entry added successfully." });
    } catch (err) {
        res.status(500).send({ message: "Error adding tracking entry", error: err.message });
    }
});

// Update current location
trackApp.put("/update/:trackingId", async (req, res) => {
    try {
        const { trackingId } = req.params;
        const { currentLocation } = req.body;
        await req.trackCollection.updateOne(
            { trackingId },
            { $set: { currentLocation, updatedAt: new Date() } }
        );
        res.send({ message: "Tracking location updated successfully." });
    } catch (err) {
        res.status(500).send({ message: "Error updating location", error: err.message });
    }
});

// Get tracking data
trackApp.get("/location/:trackingId", async (req, res) => {
    try {
        const { trackingId } = req.params;
        const trackingData = await req.trackCollection.findOne({ trackingId });
        if (!trackingData) return res.status(404).send({ message: "Tracking data not found." });
        res.send(trackingData);
    } catch (err) {
        res.status(500).send({ message: "Error fetching tracking data", error: err.message });
    }
});

// Mark as delivered
trackApp.put("/delivered/:trackingId", async (req, res) => {
    try {
        const { trackingId } = req.params;
        await req.trackCollection.updateOne(
            { trackingId },
            { $set: { status: "Delivered", updatedAt: new Date() } }
        );
        res.send({ message: "Tracking status updated to Delivered." });
    } catch (err) {
        res.status(500).send({ message: "Error updating status", error: err.message });
    }
});

module.exports = trackApp;