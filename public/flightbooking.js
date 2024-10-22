var flightDataObject = {};  // Declare an object to store the data

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
        var opt1 = `<option value=${flight.Districts}>${flight.flight_departures}</option>`;
        var opt2 = `<option value=${flight.Districts}>${flight.flight_arrivals}</option>`;
        document.getElementById('departure').innerHTML += opt1;
        document.getElementById('arrival').innerHTML += opt2;
    });
}

// Call the function to fetch data
fetchFlightData();

document.addEventListener('DOMContentLoaded', function() {
    const flightbutton = document.getElementById("flightbutton");

    if (flightbutton) {
        flightbutton.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default form submission behavior

            // Collect form values
            const departure = document.getElementById("departure").value;
            const arrival = document.getElementById("arrival").value;
            const departureDate = document.getElementById("departureDate").value;
            const returnDate = document.getElementById("returnDate").value;
            const passengers = document.getElementById("passengers").value;

            // Flight booking object
            const flightBooking = {
                user_departure: departure,
                user_arrivals: arrival,
                user_departureDates: departureDate,
                user_returnDates: returnDate,
                user_passengers: passengers
            };

            let hasErrors = false;

            // Reset error messages
            document.getElementById('departureerror').innerHTML = "";
            document.getElementById('arrivalerror').innerHTML = "";
            document.getElementById('departureDateerror').innerHTML = "";
            document.getElementById('returnDateerror').innerHTML = "";
            document.getElementById('passengerserror').innerHTML = "";

            // Validate departure and arrival (same airport not allowed)
            if (flightBooking.user_departure === flightBooking.user_arrivals) {
                document.getElementById('departureerror').innerHTML = "Please select a different departure airport.";
                document.getElementById('arrivalerror').innerHTML = "Please select a different arrival airport.";
                document.getElementById('departureerror').style.color = "red";
                document.getElementById('arrivalerror').style.color = "red";
                hasErrors = true;
            }

            // Validate that all required fields are filled
            if (!flightBooking.user_departure.trim() || 
                !flightBooking.user_arrivals.trim() || 
                !flightBooking.user_departureDates.trim() || 
                !flightBooking.user_returnDates.trim() || 
                !flightBooking.user_passengers.trim()) {
                document.getElementById('departureerror').innerHTML = "Please select the departure airport.";
                document.getElementById('arrivalerror').innerHTML = "Please select the arrival airport.";
                document.getElementById('departureDateerror').innerHTML = "Please select the departure date.";
                document.getElementById('returnDateerror').innerHTML = "Please select the return date.";
                document.getElementById('passengerserror').innerHTML = "Please select the number of passengers.";
                document.getElementById('departureerror').style.color = "red";
                document.getElementById('arrivalerror').style.color = "red";
                document.getElementById('departureDateerror').style.color = "red";
                document.getElementById('returnDateerror').style.color = "red";
                document.getElementById('passengerserror').style.color = "red";
                hasErrors = true;
            }

            // Stop if there are errors
            if (hasErrors) {
                return; // Prevent further actions if validation fails
            }

            // If no errors, proceed with the fetch request and redirection
            fetch('http://localhost:3000/submit-flight-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(flightBooking)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Flight booking data:', data);

                // Show toast notification (if bootstrap is being used)
                var toastLiveExample = document.getElementById('liveToast');
                var toast = new bootstrap.Toast(toastLiveExample);
                toast.show();

                // Redirect after showing the toast
                setTimeout(() => {
                    const params = new URLSearchParams(flightBooking).toString();
                    window.location.href = `./bookingpage/flight.html?${params}`; // Pass parameters via URL
                }, 1000);// Delay the redirection to allow toast to appear
            })
            .catch(error => console.error('Error submitting flight booking:', error));
        });
    }
});

