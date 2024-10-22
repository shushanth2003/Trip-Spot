let trainDataObject = {};

function fetchTrainData() {
    fetch('http://localhost:3000/train')
    .then(response => response.json())
    .then(data => {
        trainDataObject = {
            trains: data
        };
        console.log('Train Data Object:', trainDataObject);
        processTrainData(trainDataObject);
    })
    .catch(error => console.log('Error fetching data:', error));
}

function processTrainData(data) {
    console.log('Processing train data:', data.trains);
    const destinationDropdown = document.getElementById('fromStation_train');
    
    // Clear previous options
    destinationDropdown.innerHTML = '';

    data.trains.forEach(train => {
        const opt1 = `<option value="${train.from_station}">${train.from_station}</option>`;
        const opt2=`<option value="${train.from_station}">${train.from_station}</option>`
        destinationDropdown.innerHTML += opt1;
        document.getElementById('toStation_train').innerHTML += opt2;
    });
}

// Fetch train data on page load
fetchTrainData();
document.addEventListener('DOMContentLoaded', function() {
    const trainbuttons = document.getElementById("trainbutton");
    
    if (trainbuttons) {
        trainbuttons.addEventListener("click", function(event) {
            event.preventDefault();
            
            const fromStation_trains = document.getElementById("fromStation_train").value;
            const toStation_trains = document.getElementById("toStation_train").value;
            const departureDate_trains = document.getElementById("departureDate_train").value;
            const returnDate_trains = document.getElementById("returnDate_train").value;
            const classType_trains = document.getElementById("classType_train").value;
            const passengers_trains = document.getElementById("passengers_train").value;

            const trainbooking = {
                user_fromStation_trains:fromStation_trains,
                user_toStation_trains:toStation_trains,
                user_departureDate_trains:departureDate_trains,
                user_returnDate_trains:returnDate_trains,
                user_classType_trains:classType_trains,
                user_passengers_trains:passengers_trains
            };
            let hasError=false;
            if (trainbooking.user_fromStation_trains === trainbooking.user_toStation_trains) {
                document.getElementById('fromStation_train_error').innerHTML = "Please select a different departure airport.";
                document.getElementById('toStation_train_error').innerHTML = "Please select a different arrival airport.";
                document.getElementById('fromStation_train_error').style.color = "red";
                document.getElementById('toStation_train_error').style.color = "red";
                hasErrors = true;
            }
            // Validate that all required fields are filled
            if (!trainbooking.user_fromStation_trains.trim() || 
                !trainbooking.user_toStation_trains.trim() || 
                !trainbooking.user_departureDate_trains.trim() || 
                !trainbooking.user_returnDate_trains.trim() || 
                !trainbooking.user_classType_trains.trim() ||
            !trainbooking.user_passengers_trains.trim()) {
                document.getElementById('fromStation_train_error').innerHTML = "Please select the departure airport.";
                document.getElementById('toStation_train_error').innerHTML = "Please select the arrival airport.";
                document.getElementById('departureDate_train_error').innerHTML = "Please select the departure date.";
                document.getElementById('returnDate_train_error').innerHTML = "Please select the return date.";
                document.getElementById('classType_train_error').innerHTML = "Please select the number of Class Type.";
                document.getElementById('passengers_train_error').innerHTML= "Please select the number of Passengers"
                document.getElementById('fromStation_train_error').style.color = "red";
                document.getElementById('toStation_train_error').style.color = "red";
                document.getElementById('departureDate_train_error').style.color = "red";
                document.getElementById('returnDate_train_error').style.color = "red";
                document.getElementById('classType_train_error').style.color = "red";
                document.getElementById('passengers_train_error').style.color="red";
                hasErrors = true;
            }

            // Stop if there are errors
            if (hasError) {
                return; // Prevent further actions if validation fails
            }
            fetch('http://localhost:3000/submit-train-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(trainbooking)
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
                    const params = new URLSearchParams(trainbooking).toString();
                    window.location.href = `./bookingpage/trainbooking.html?${params}`; // Pass parameters via URL
                }, 1000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});