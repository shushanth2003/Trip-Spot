let cabDataObject = {};

function fetchcabData() {
    fetch('http://localhost:3000/cabdropdown')
    .then(response => response.json())
    .then(data => {
        cabDataObject = {
            cabs: data
        };
        console.log('cab Data Object:', cabDataObject);
        processcabData(cabDataObject);
    })
    .catch(error => console.log('Error fetching data:', error));
}

function processcabData(data) {
    console.log('Processing cab data:', data.cabs);
    const carDropdown = document.getElementById('cabType');
    
    // Clear previous options
    carDropdown.innerHTML = '';

    data.cabs.forEach(cab => {
        const opt1 = `<option value="${cab.cartype}">${cab.cartype}</option>`;
        carDropdown.innerHTML += opt1;
    });
}

// Fetch train data on page load
fetchcabData();
document.addEventListener('DOMContentLoaded', function() {
    const cabbuttons = document.getElementById("cabbutton");
    
    if (cabbuttons) {
        cabbuttons.addEventListener("click", function(event) {
            event.preventDefault();
            
            const pickupLocations = document.getElementById("pickupLocation").value;
            const dropoffLocations = document.getElementById("dropoffLocation").value;
            const pickupDates = document.getElementById("pickupDate").value;
            const pickupTimes = document.getElementById("pickupTime").value;
            const cabTypes = document.getElementById("cabType").value;
            const cabpassenger = document.getElementById("cabpassengers").value;

            const cabbooking = {
                user_pickupLocation:pickupLocations,
                user_dropoffLocation:dropoffLocations,
                user_pickupDate:pickupDates,
                user_pickupTimes:pickupTimes,
                user_cabType:cabTypes,
                user_passenger:cabpassenger
            };
            let hasError=false;
            if (cabbooking.user_pickupLocation === cabbooking.user_dropoffLocation) {
                document.getElementById('pickuplocation_error').innerHTML = "Please select a different Pickup Location.";
                document.getElementById('dropofflocation_error').innerHTML = "Please select a different Dropoff Location.";
                document.getElementById('pickuplocation_error').style.color = "red";
                document.getElementById('dropofflocation_error').style.color = "red";
                hasErrors = true;
            }
            // Validate that all required fields are filled
            if (!cabbooking.user_pickupLocation.trim() || 
                !cabbooking.user_dropoffLocation.trim() || 
                !cabbooking.user_pickupDate.trim() || 
                !cabbooking.user_pickupTimes.trim() || 
                !cabbooking.user_cabType.trim() ||
            !cabbooking.user_passenger.trim()) {
                document.getElementById('pickuplocation_error').innerHTML = "Please select the departure airport.";
                document.getElementById('dropofflocation_error').innerHTML = "Please select the arrival airport.";
                document.getElementById('pickupdate_error').innerHTML = "Please select the departure date.";
                document.getElementById('pickuptime_error').innerHTML = "Please select the return date.";
                document.getElementById('cabType_error').innerHTML = "Please select the number of Class Type.";
                document.getElementById('passengers_error').innerHTML= "Please select the number of Passengers"
                document.getElementById('pickuplocation_error').style.color = "red";
                document.getElementById('dropofflocation_error').style.color = "red";
                document.getElementById('pickupdate_error').style.color = "red";
                document.getElementById('pickuptime_error').style.color = "red";
                document.getElementById('cabType_error').style.color = "red";
                document.getElementById('passengers_error').style.color="red";
                hasErrors = true;
            }

            // Stop if there are errors
            if (hasError) {
                return; // Prevent further actions if validation fails
            }
            fetch('http://localhost:3000/submit-cab-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cabbooking)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data:', data);
                var toastLiveExample = document.getElementById('liveToast');
                var toast = new bootstrap.Toast(toastLiveExample);
                toast.show();
                setTimeout(() => {
                    const params = new URLSearchParams(cabbooking).toString();
                    window.location.href = `./bookingpage/cabbooking.html?${params}`; // Pass parameters via URL
                }, 1000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});