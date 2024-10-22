
let flightDataObject = {};  // Declare an object to store the data

// Function to fetch flight data and handle it
function fetchFlightData() {
    fetch('http://localhost:3000/flightdataset')
    .then(response => response.json())
    .then(data => {
        // Save the fetched data in the object
        flightDataObject = {
            flights: data  // You can adjust the key name (flights) based on your preference
        };
        
        // Log the saved object after data is fetched
        console.log('Flight Data Object:', flightDataObject);
        
        // Call a function to process the data
        processFlightData(flightDataObject);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Function to process the flight data
function processFlightData(data) {
    console.log('Processing Flight Data:', data.flights);

    // Populate dropdowns with fetched flight data
    data.flights.forEach(flight => {
        const opt1 = `<option value="${flight.Districts}">${flight.flight_departures}</option>`;
        const opt2 = `<option value="${flight.Districts}">${flight.flight_arrivals}</option>`;
        document.getElementById('flight_departures').innerHTML += opt1;
        document.getElementById('flight_arrivals').innerHTML += opt2;
    });

    // After processing and populating the dropdowns, set the selected values
    setSelectedValues();
}
fetchFlightData()
// Function to set selected values from the URL parameters
function setSelectedValues() {
    const locationpath = window.location.search;
    const urlsearch = new URLSearchParams(locationpath);
    const flight_departures = urlsearch.get('user_departure');
    const flight_arrivals = urlsearch.get('user_arrivals');
    const flight_departureDates = urlsearch.get('user_departureDates');
    const flight_returnDates = urlsearch.get('user_returnDates');
    const flight_passengers = urlsearch.get('user_passengers');

    // Now set the values in the respective select and input fields
    if (flight_departures) {
        document.getElementById("flight_departures").value = flight_departures;
    }
    if (flight_arrivals) {
        document.getElementById("flight_arrivals").value= flight_arrivals;
    }
    if (flight_departureDates) {
        document.getElementById("flight_departure_dates").value = flight_departureDates;
    }
    if (flight_returnDates) {
        document.getElementById("flight_return_date").value = flight_returnDates;
    }
    if (flight_passengers) {
        document.getElementById("flight_passengers").value = flight_passengers;
    }
    return {flight_departures,flight_arrivals,flight_departureDates,flight_returnDates,flight_passengers}
}

// Call the function to fetch data
const flightdata=setSelectedValues();
document.getElementById("departurename").innerHTML=flightdata.flight_departures;
document.getElementById("arrivalname").innerHTML=flightdata.flight_arrivals;
document.getElementById('arrivalsname').innerHTML=flightdata.flight_arrivals;
document.getElementById('departuresname').innerHTML=flightdata.flight_departures;
document.getElementById('departuressname').innerHTML=flightdata.flight_departures;
document.getElementById('arrivalssname').innerHTML=flightdata.flight_arrivals;
document.getElementById('arrivalsssname').innerHTML=flightdata.flight_arrivals;
document.getElementById('departuresssname').innerHTML=flightdata.flight_departures; 

    // Get the checkboxes
const oneWayCheckbox = document.getElementById('onewaycheckbox');
const roundTripCheckbox = document.getElementById('roundwaycheckbox');

    // Add event listeners for the checkboxes
oneWayCheckbox.addEventListener('click', handleCheckboxChange);
roundTripCheckbox.addEventListener('change', handleCheckboxChange);
// Show or hide one-way trip flights based on checkbox
// Show or hide trips based on checkbox
function handleCheckboxChange() {
    const oneWayTrips = document.querySelectorAll('.onewayContainer');
    const roundTripContainers = document.querySelectorAll('.roundTripContainer');

    const oneWayChecked = oneWayCheckbox.checked;
    const roundTripChecked = roundTripCheckbox.checked;

    // If both checkboxes are unchecked, show all trips
    if (!oneWayChecked && !roundTripChecked) {
        oneWayTrips.forEach(flight => {
            flight.classList.remove('hidden');
            flight.classList.add('visible');
        });
        roundTripContainers.forEach(flight => {
            flight.classList.remove('hidden');
            flight.classList.add('visible');
        });
    } else {
        // Show or hide one-way trips based on checkbox
        oneWayTrips.forEach(flight => {
            if (oneWayChecked) {
                flight.classList.remove('hidden');
                flight.classList.add('visible');
            } else {
                flight.classList.remove('visible');
                flight.classList.add('hidden');
            }
        });

        // Show or hide round trip flights based on checkbox
        roundTripContainers.forEach(flight => {
            if (roundTripChecked) {
                flight.classList.remove('hidden');
                flight.classList.add('visible');
            } else {
                flight.classList.remove('visible');
                flight.classList.add('hidden');
            }
        });
    }
}

flightinsidebtn.addEventListener('click', getdataflight);

function getdataflight() {
    const getdata_flight_departures = document.getElementById("flight_departures").value;
    const getdata_flight_arrivals = document.getElementById("flight_arrivals").value;
    const getdata_flight_departure_dates=document.getElementById("flight_departure_dates").value;
    const getdata_flight_return_dates=document.getElementById("flight_return_date").value;
    const getdata_flight_passengers=document.getElementById("flight_passengers").value;
    

    // Use the variables directly instead of flightdata object
    document.querySelector(".departurenames").innerHTML = getdata_flight_departures;
    document.querySelector(".arrivalnames").innerHTML = getdata_flight_arrivals;
    document.querySelector('.arrivalsnames').innerHTML = getdata_flight_arrivals;
    document.querySelector('.departuresnames').innerHTML = getdata_flight_departures;
    document.querySelector('.departuressnames').innerHTML = getdata_flight_departures;
    document.querySelector('.arrivalssnames').innerHTML = getdata_flight_arrivals;
    document.querySelector('.arrivalsssnames').innerHTML = getdata_flight_departures;
    document.querySelector('.departuresssnames').innerHTML = getdata_flight_departures;

    let hasErrorss = false;

    // Reset error messages
    document.getElementById('flight_departures_error').innerHTML = "";
    document.getElementById('flight_arrivals_error').innerHTML = "";
    document.getElementById('flight_departure_dates_error').innerHTML = "";
    document.getElementById('flight_return_date_error').innerHTML = "";
    document.getElementById('flight_passengers_error').innerHTML = "";

    // Validate departure and arrival (same airport not allowed)
    if (getdata_flight_departures === getdata_flight_arrivals) {
        document.getElementById('flight_departures_error').innerHTML = "Please select a different departure airport.";
        document.getElementById('flight_arrivals_error').innerHTML = "Please select a different arrival airport.";
        document.getElementById('flight_departures_error').style.color = "red";
        document.getElementById('flight_arrivals_error').style.color = "red";
        hasErrorss = true;
    }

    // Validate that all required fields are filled
    if (!getdata_flight_departures.trim() || 
        !getdata_flight_arrivals.trim() || 
        !getdata_flight_departure_dates.trim() || 
        !getdata_flight_return_dates.trim() || 
        !getdata_flight_passengers.trim()) {
        document.getElementById('flight_departures_error').innerHTML = "Please select the departure airport.";
        document.getElementById('flight_arrivals_error').innerHTML = "Please select the arrival airport.";
        document.getElementById('flight_departure_dates_error').innerHTML = "Please select the departure date.";
        document.getElementById('flight_return_date_error').innerHTML = "Please select the return date.";
        document.getElementById('flight_passengers_error').innerHTML = "Please select the number of passengers.";
        document.getElementById('flight_departures_error').style.color = "red";
        document.getElementById('flight_arrivals_error').style.color = "red";
        document.getElementById('flight_departure_dates_error').style.color = "red";
        document.getElementById('flight_return_date_error').style.color = "red";
        document.getElementById('flight_passengers_error').style.color = "red";
        hasErrors = true;
    }

}





    

















