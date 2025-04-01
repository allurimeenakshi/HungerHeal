// Import express module
const express = require('express');
const app = express(); // Express application object

// Import environment variables
require('dotenv').config();

// Middleware
const cors = require('cors');

const allowedOrigins = [
    'http://localhost:5173',  
    'http://localhost:5000',
    process.env.FRONTEND_URL // Add your deployed frontend URL in .env
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Import MongoClient
const { MongoClient } = require('mongodb');

// Create MongoClient object
const mongoclient = new MongoClient(process.env.DB_URL);

// Connect to MongoDB server
async function connectDB() {
    try {
        await mongoclient.connect();
        console.log("✅ DB CONNECTION SUCCESS!");

        // Connect to database
        const db = mongoclient.db('hungerhealdb');

        // Collections
        app.set('usersCollection', db.collection('users'));
        app.set('donationsCollection', db.collection('donations'));
        app.set('requestsCollection', db.collection('requests'));
        app.set('feedbackCollection', db.collection('feedback'));
        app.set('trackCollection', db.collection('track'));

        // Start the HTTP server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    } catch (err) {
        console.error("❌ Error in DB Connection:", err);
        process.exit(1); // Exit process if DB connection fails
    }
}
connectDB();

// Import API Routes
app.use('/user-api', require('./APIs/userAPI'));
app.use('/donate-api', require('./APIs/donateAPI'));
app.use('/request-api', require('./APIs/requestAPI'));
app.use('/feedback-api', require('./APIs/feedbackAPI'));
app.use('/track-api', require('./APIs/trackAPI'));

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: "An error occurred", error: err.message });
});

