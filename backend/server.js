// Import express module
const exp = require('express');
const app = exp(); // app contains express application object

// Import environment variables
require('dotenv').config();

// Middleware
const cors = require('cors');
const allowedOrigins = ['http://localhost:5173'];

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

    // Share collection objects with the APIs
    app.set('usersCollection', usersCollection);

    // Start the HTTP server if DB connection succeeds
    app.listen(process.env.PORT, () => console.log(`HTTP server started at port ${process.env.PORT}`));
}).catch((err) => {
    console.log("Error in DB Connection : ", err);
});

// Import APIs
const userApp = require('./APIs/userAPI');
app.use('/user-api', userApp);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send({ message: "An error occurred: ", errorMessage: err.message });
});
