// feedbackAPI.js
const express = require("express");
const feedbackApp = express.Router();
const { ObjectId } = require("mongodb");

// Middleware to parse JSON requests
feedbackApp.use(express.json());

// GET all feedback entries
feedbackApp.get("/feedbacks", async (req, res) => {
  try {
    const feedbackCollection = req.app.get("feedbackCollection");
    const feedbacks = await feedbackCollection.find().toArray();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error: error.message });
  }
});

// POST a new feedback entry
feedbackApp.post("/feedback", async (req, res) => {
  try {
    const feedbackCollection = req.app.get("feedbackCollection");
    const newFeedback = req.body;
    newFeedback.createdAt = new Date();
    await feedbackCollection.insertOne(newFeedback);
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback", error: error.message });
  }
});

// DELETE a feedback entry
feedbackApp.delete("/feedback/:id", async (req, res) => {
  try {
    const feedbackCollection = req.app.get("feedbackCollection");
    const feedbackId = req.params.id;
    await feedbackCollection.deleteOne({ _id: new ObjectId(feedbackId) });
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error: error.message });
  }
});

module.exports = feedbackApp;