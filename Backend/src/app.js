// backend/app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the connectDB function
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to MongoDB using the imported function
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes); // Use your auth routes

// Define a model MongoDB
const Data = mongoose.model('Data', new mongoose.Schema({
    title: String,
    description: String
}));

// Route to retrieve data from MongoDB
app.get('/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error });
    }
});

module.exports = app;