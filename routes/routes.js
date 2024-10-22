// Import the necessary modules
const express = require('express');
const router = express.Router();
const db = require('../db/db'); // Import database connection

// Route for handling account creation
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Insert user data into the database
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
        }
        res.send('User registered successfully');
    });
});

// Route for handling login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check user credentials
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
        }

        if (result.length > 0) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Export the router
module.exports = router;

