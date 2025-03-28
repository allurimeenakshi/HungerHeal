// Import express module
const exp = require('express');
const express = require("express");
const app = exp(); // app contains express application object

// Import environment variables
require('dotenv').config();

// Middleware
const cors = require('cors');
const allowedOrigins = [
    'http://localhost:5173',  
    'http://localhost:5000' 
  ];
  
  app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
}));

// Import MongoClient
const { MongoClient } = require('mongodb');

// Create MongoClient object
let mongoclient = new MongoClient(process.env.DB_URL);

// Connect to MongoDB server
mongoclient.connect().then((connectionObj) => {
    console.log("DB CONNECTION SUCCESS!");

    // Connect to the database
    const db = connectionObj.db('hungerhealdb');

    // Connect to collections
    const usersCollection = db.collection('users');
    const donationsCollection = db.collection('donations');
    const requestsCollection = db.collection('requests');
    const feedbackCollection = db.collection('feedback');
    const trackCollection = db.collection('track');
   

    // Share collection objects with the API
    app.set('usersCollection', usersCollection);
    app.set('donationsCollection', donationsCollection);
    app.set('requestsCollection', requestsCollection);
    app.set('feedbackCollection', feedbackCollection);
    app.set('trackCollection', trackCollection);
    

    // Start the HTTP server if DB connection has succeeded
    app.listen(process.env.PORT, () => console.log("HTTP server started at port 5000"));
}).catch((err) => {
    console.log("Error in DB Connection : ", err);
});

// Import userApp
const userApp = require('./APIs/userAPI');
app.use('/user-api', userApp);

// Import donateApp
const donateApp = require('./APIs/donateAPI');
app.use('/donate-api', donateApp);

// Import requestApp
const requestApp = require('./APIs/requestAPI');
app.use('/request-api', requestApp);

// Import feedbackApp
const feedbackApp = require('./APIs/feedbackAPI');
app.use('/feedback-api', feedbackApp);

// Import trackApp
// const trackApp = require('./APIs/trackAPI');
// app.use('/track-api', trackApp);



// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send({ message: "An error occurred: ", errorMessage: err.message });
});