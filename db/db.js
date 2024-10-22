// Import the mysql module
const mysql = require('mysql');

// Create the database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '4321',  // Your MySQL password
    database: 'login_crud', // Your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

// Export the database connection
module.exports = db;
