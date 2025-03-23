const exp = require("express");
const requestApp = exp.Router();
const { ObjectId } = require("mongodb");

requestApp.use(exp.json());

requestApp.post("/request", async (req, res) => {
  const requestsCollection = req.app.get("requestsCollection");
  try {
    const newRequest = { ...req.body, status: "Pending", createdAt: new Date() };
    await requestsCollection.insertOne(newRequest);
    res.status(201).json({ message: "Request submitted successfully!" });
  } catch (error) {
    console.error("Error submitting request:", error);
    res.status(500).json({ message: "Failed to submit request" });
  }
});

requestApp.get("/requests", async (req, res) => {
  const requestsCollection = req.app.get("requestsCollection");
  try {
    const requests = await requestsCollection.find().toArray();
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
});

requestApp.delete("/request/:id", async (req, res) => {
  const requestsCollection = req.app.get("requestsCollection");
  try {
    const requestId = new ObjectId(req.params.id);
    await requestsCollection.deleteOne({ _id: requestId });
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ message: "Failed to delete request" });
  }
});

module.exports = requestApp;
