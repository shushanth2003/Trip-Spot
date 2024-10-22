// Import the necessary modules
const express = require('express');
const app = express();
const routes = require('./routes/routes'); // Import routes
// Import database connection

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

// Use the routes
app.use('/', routes);

// Start the server
app.listen(5000, () => {
    console.log("Server Started @ Port 5000");
});
