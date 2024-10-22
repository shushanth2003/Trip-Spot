const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());  

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "4321",
    database: "login_crud"
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
    } else {
        console.log("MySQL connected");
    }
});
// -----------------------------------------------------------getting the flightbooking dataset------------------------------------------------------
app.get('/flightdataset', (req, res) => {
    // const sqlQuery = 'SELECT flight_departures, flight_arrivals FROM flightdataset';
    const sqlQuery= 'SELECT flight_departures, flight_arrivals, Districts FROM flightdataset;';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});
// ----------------------------------------------------getting the hotel booking---------------------------------------------------------------------
app.get('/hoteldataset', (req, res) => {
    const sqlQuery = 'SELECT * FROM hoteldataset';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});
// ---------------------------------------------------------getting the homestay destination---------------------------------------------------------
app.get('/homestayvillas', (req, res) => {
    const sqlQuery = 'SELECT * FROM homevillasdataset;';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});
// ----------------------------------------------------getting a holidaypackagebooking------------------------------------------------------------------------
app.get('/holidaypackage', (req, res) => {
    const sqlQuery = 'SELECT * FROM holidaypackagedropdown';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});
// --------------------------------------------------------getting a train-----------------------------------------------
app.get('/train', (req, res) => {
    const sqlQuery = 'SELECT * FROM train_booking';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});
// -------------------------------------------------getting the value in cabdropdown------------------------
app.get('/cabdropdown', (req, res) => {
    const sqlQuery = 'SELECT * FROM cabtypedropdown';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});
// -----------------------------------------getting the forexcard---------------------------------
app.get('/forexdropdown', (req, res) => {
    const sqlQuery = 'SELECT * FROM currencydropdown';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});
// --------------------------------------------getting the travelinsurance---------------------------------------
app.get('/travelinsurancedropdown', (req, res) => {
    const sqlQuery = 'SELECT * FROM travel_insurance';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});
app.post("/login", (req, res) => {
    console.log("Received data:", req.body);
    const { email, password } = req.body;


    const query = "SELECT * FROM users WHERE EMAIL = ? AND PASSWORDS = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Database query error:", err.message);
            return res.status(500).send("Error querying the database");
        }
        console.log('result..' , results)

        // Check if a user was found
        if (results.length > 0) {
            res.status(200).send(results); 
        } else {
            res.status(401).send("Invalid email or password");
        }
    });
});
// Route to handle flight booking form submission
app.post('/submit-flight-booking', (req, res) => {
    const flightbooking = req.body;

    // MySQL query to insert flight booking data
    const sql = 'INSERT INTO flight_bookings (departure, arrival, departure_date, return_date, passengers) VALUES (?, ?, ?, ?, ?)';
    const values = [
        flightbooking.user_departure,
        flightbooking.user_arrivals,
        flightbooking.user_departureDates,
        flightbooking.user_returnDates,
        flightbooking.user_passengers
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(200).json({ message: 'Flight booking saved successfully' });
    });
});
app.post('/submit-hotel-booking', (req, res) => {
    const hotelbooking = req.body;

    console.log('hi' , req.body);

    // MySQL query to insert flight booking data
    const sql = 'INSERT INTO hotel_bookings (destination, checkInDate, checkOutDate, guests, rooms) VALUES (?, ?, ?, ?, ?)';
    const values = [
        hotelbooking.user_destination,
        hotelbooking.user_checkInDate,
        hotelbooking.user_checkOutDate,
        hotelbooking.user_guest,
        hotelbooking.user_room
    ];
    console.log(values);
 try{
    db.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(200).json({ message: 'Hotel booking saved successfully' });
    });}
    catch(error){
        console.log(error);
    }
});

app.post('/submit-homestayvillas-booking', (req, res) => {
    const homevillasbooking = req.body;

    console.log('Received data:', homevillasbooking); // To verify incoming data

    const sql = 'INSERT INTO homestaysvillas_bookings (destination_homestays, checkInDate_homestays, checkOutDate_homestays, guests_homestays, propertyValues_homestays, rooms_homestays) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [
        homevillasbooking.user_destination_homestays,
        homevillasbooking.user_checkInDate_homestays,
        homevillasbooking.user_checkOutDate_homestays,
        homevillasbooking.user_guest_homestays,
        homevillasbooking.user_propertyTypes_homestays,
        homevillasbooking.user_room_homestays
    ];

    console.log('SQL Values:', values); // To check the values before sending to the database

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err); // Log the exact SQL error
            res.status(500).json({ error: 'Database error: ' + err.message });
            return;
        }
        res.status(200).json({ message: 'Homevillas booking saved successfully' });
    });
});
app.post('/submit-holidaypackage-booking', (req, res) => {
    const holidaypackagebooking = req.body;

    console.log('Received data:', holidaypackagebooking); // To verify incoming data

    const sql = 'INSERT INTO holidaypackagebookings (destination, start_date, end_date, guests, package_type, budget) VALUES (?, ?, ?, ?, ?, ?)'; 
    const values = [
        holidaypackagebooking.user_destination_holidaypackage,
        holidaypackagebooking.user_startDate_holidaypackage,
        holidaypackagebooking.user_endDate_holidaypackage,
        holidaypackagebooking.user_guests_holidaypackage,
        holidaypackagebooking.user_packageType_holidaypackage,
        holidaypackagebooking.user_budget_holidaypackage
    ];

    console.log('SQL Values:', values); // To check the values before sending to the database

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err); // Log the exact SQL error
            res.status(500).json({ error: 'Database error: ' + err.message });
            return;
        }
        res.status(200).json({ message: 'Holiday&Packages booking saved successfully' });
    });
});
app.post('/submit-train-booking', (req, res) => {
    const trainbooking = req.body;  // Use the correct variable name 'cabbooking'

    console.log('Received data:', trainbooking);  // Correct logging statement

    const sql = 'INSERT INTO trainbooking (fromStation, toStation, departureDate, returnDate, classType, passengers) VALUES (?,?,?,?,?,?)';

    const values = [
        trainbooking.user_fromStation_trains,
        trainbooking.user_toStation_trains,
        trainbooking.user_departureDate_trains,
        trainbooking.user_returnDate_trains,
        trainbooking.user_classType_trains,
        trainbooking.user_passengers_trains
    ];

    console.log('SQL Values:', values);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            res.status(500).json({ error: 'Database error: ' + err.message });
            return;
        }
        res.status(200).json({ message: 'train booking saved successfully' });
    });
});



app.post('/submit-cab-booking', (req, res) => {
    const cabbooking = req.body;  // Use the correct variable name 'cabbooking'

    console.log('Received data:', cabbooking);  // Correct logging statement

    const sql = 'INSERT INTO cabbooking (pickupLocation, dropoffLocation, pickupDate, pickupTimes, cabtype, passengers) VALUES (?,?,?,?,?,?)';

    const values = [
        cabbooking.user_pickupLocation,
        cabbooking.user_dropoffLocation,
        cabbooking.user_pickupDate,
        cabbooking.user_pickupTimes,
        cabbooking.user_cabType,
        cabbooking.user_passenger
    ];

    console.log('SQL Values:', values);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            res.status(500).json({ error: 'Database error: ' + err.message });
            return;
        }
        res.status(200).json({ message: 'Cab booking saved successfully' });
    });
});



app.post('/submit-forexcard-booking', (req, res) => {
    const forexcardbooking = req.body;  // Use the correct variable name 'cabbooking'

    console.log('Received data:', forexcardbooking);  // Correct logging statement

    const sql = 'INSERT INTO forexcardbooking (currencyTypes, amounts, forexcards, deliveryOptions) VALUES (?,?,?,?)';

    const values = [
        forexcardbooking.user_currencyTypes,
        forexcardbooking.user_amounts,
        forexcardbooking.user_forexcards,
        forexcardbooking.user_deliveryOptions
    ];

    console.log('SQL Values:', values);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            res.status(500).json({ error: 'Database error: ' + err.message });
            return;
        }
        res.status(200).json({ message: 'forexcard booking saved successfully' });
    });
});

app.post('/submit-travelinsurance-booking', (req, res) => {
    const travelinsurancebooking = req.body;  // Use the correct variable name 'cabbooking'

    console.log('Received data:', travelinsurancebooking);  // Correct logging statement

    const sql = 'INSERT INTO travelinsurancebooking(fullName, email, traveldestination, traveldate, insuranceType, travelpurpose) VALUES (?,?,?,?,?,?)';

    const values = [
        travelinsurancebooking.user_fullName_travels,
        travelinsurancebooking.user_email_travels,
        travelinsurancebooking.user_traveldestination_travels,
        travelinsurancebooking.user_traveldate_travels,
        travelinsurancebooking.user_insuranceType_travels,
        travelinsurancebooking.user_travelPurpose_travels
    ];

    console.log('SQL Values:', values);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            res.status(500).json({ error: 'Database error: ' + err.message });
            return;
        }
        res.status(200).json({ message: 'travelinsurance booking saved successfully' });
    });
});
app.listen(3000, () => {
    console.log("Server started on port 3000");
});


