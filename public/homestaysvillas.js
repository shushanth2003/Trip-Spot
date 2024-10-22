// fetch('http://localhost:3000/homestayvillas')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error fetching data:', error));
let homeStayVillas = {};

function fetchhomestayVillas() {
    fetch('http://localhost:3000/homestayvillas')
    .then(response => response.json())
    .then(data => {
        homeStayVillas = {
            homevillas: data
        };
        console.log('HomestayVillas Data Object:', homeStayVillas);
        processHomestayvillas(homeStayVillas);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function processHomestayvillas(data) {
    console.log('Processing HomestayVillas Data', data.homevillas);
    data.homevillas.forEach(homevilla => {
        const opt=`<option value=${homevilla.destination}>${homevilla.destination}</option>`
        document.getElementById('destination_homestays').innerHTML+=opt
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchhomestayVillas();

    const homestaysvillasbuttons = document.getElementById("homestaysvillasbutton");

    if (homestaysvillasbuttons) {
        homestaysvillasbuttons.addEventListener("click", function(event) {
            event.preventDefault();

            const destinations_homestays = document.getElementById("destination_homestays").value;
            const checkInDates_homestays = document.getElementById("checkInDate_homestays").value;
            const checkOutDates_homestays = document.getElementById("checkOutDate_homestays").value;
            const guests_homestays = document.getElementById("guest_homestays").value;
            const propertyTypes_homestays = document.getElementById("propertyType_homestays").value;
            const rooms_homestays = document.getElementById("room_homestays").value;

            const homevillasbooking = {
                user_destination_homestays: destinations_homestays,
                user_checkInDate_homestays: checkInDates_homestays,
                user_checkOutDate_homestays: checkOutDates_homestays,
                user_guests_homestays: guests_homestays,
                user_propertyTypes_homestays: propertyTypes_homestays,
                user_rooms_homestays: rooms_homestays
            };
            let hasErrors = false;

            // Reset error messages
            document.getElementById('destination_homestay_error').innerHTML = "";
            document.getElementById('checkInDate_homestays_error').innerHTML = "";
            document.getElementById('checkOutDate_homestays_error').innerHTML = "";
            document.getElementById('guest_homestays_error').innerHTML = "";
            document.getElementById('propertyType_homestays_error').innerHTML = "";
            document.getElementById('room_homestays_error').innerHTML=""
            // Validate that all required fields are filled
            if (!homevillasbooking.user_destination_homestays.trim() || 
                !homevillasbooking.user_checkInDate_homestays.trim() || 
                !homevillasbooking.user_checkOutDate_homestays.trim() || 
                !homevillasbooking.user_guests_homestays.trim() || 
                !homevillasbooking.user_propertyTypes_homestays.trim() ||
                !homevillasbooking.user_rooms_homestays) {
                document.getElementById('destination_homestay_error').innerHTML = "Please select the destination.";
                document.getElementById('checkInDate_homestays_error').innerHTML = "Please select the checkInDate.";
                document.getElementById('checkOutDate_homestays_error').innerHTML = "Please select the checkOutDate.";
                document.getElementById('guest_homestays_error').innerHTML = "Please select the guest Date.";
                document.getElementById('propertyType_homestays_error').innerHTML="Please select the property Date";
                document.getElementById('room_homestays_error').innerHTML = "Please select the number of Room.";
                document.getElementById('destination_homestay_error').style.color = "red";
                document.getElementById('checkInDate_homestays_error').style.color = "red";
                document.getElementById('checkOutDate_homestays_error').style.color = "red";
                document.getElementById('guest_homestays_error').style.color = "red";
                document.getElementById('propertyType_homestays_error').style.color = "red";
                document.getElementById('room_homestays_error').style.color="red";
                hasErrors = true;
            }

            // Stop if there are errors
            if (hasErrors) {
                return; // Prevent further actions if validation fails
            }
            fetch('http://localhost:3000/submit-homestayvillas-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(homevillasbooking)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Booking Response:', data);
                var toastLiveExample = document.getElementById('liveToast');
                var toast = new bootstrap.Toast(toastLiveExample);
                toast.show();
                setTimeout(()=>{
                    const paramString = new URLSearchParams(homevillasbooking).toString(); 

                    window.location.href=`./bookingpage/homestays.html?${paramString}`
                },1000)
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});
