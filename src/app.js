const express = require('express');
const app = express();


// Middleware
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to Express.js!');
});

// Export the app
module.exports = app;
