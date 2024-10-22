let hotelDataobject = {};

// Fetch hotel data
function fetchhotelData() {
    fetch('http://localhost:3000/hoteldataset')
    .then(response => response.json())
    .then(data => {
        hotelDataobject = {
            hotels: data
        };
        console.log('Hotel Data Object:', hotelDataobject);
        processHotelData(hotelDataobject);  // Call processHotelData after fetching the data
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Process and display hotel data
function processHotelData(data) {
    console.log('Processing Hotel Data:', data.hotels);
    const destinationDropdown = document.getElementById('destination');

    data.hotels.forEach(hotel => {
        const opt1 = `<option value="${hotel.hotel_name}">${hotel.hotel_name}</option>`;
        destinationDropdown.innerHTML += opt1;
    });
}

// Call fetchhotelData to fetch and process data
fetchhotelData();

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const hotelbuttons = document.getElementById("hotelbutton");
    console.log('Hotel button:', hotelbuttons);
    
    if (hotelbuttons) {
        hotelbuttons.addEventListener("click", function(event) {
            event.preventDefault();

            const destinations = document.getElementById("destination").value;
            const checkInDates = document.getElementById("checkInDate").value;
            const checkOutDates = document.getElementById("checkOutDate").value;
            const guests = document.getElementById("guest").value;
            const rooms = document.getElementById("room").value;

            const hotelbooking = {
                user_destination: destinations,
                user_checkInDate: checkInDates,
                user_checkOutDate: checkOutDates,
                user_guest: guests,
                user_room: rooms
            };

            let hasErrors = false;

            // Reset error messages
            document.getElementById('destinationerror').innerHTML = "";
            document.getElementById('checkInDateerror').innerHTML = "";
            document.getElementById('checkOutDateerror').innerHTML = "";
            document.getElementById('guesterror').innerHTML = "";
            document.getElementById('roomerror').innerHTML = "";

            // Validate that all required fields are filled
            if (!hotelbooking.user_destination.trim() || 
                !hotelbooking.user_checkInDate.trim() || 
                !hotelbooking.user_checkOutDate.trim() || 
                !hotelbooking.user_guest.trim() || 
                !hotelbooking.user_room.trim()) {
                document.getElementById('destinationerror').innerHTML = "Please select the destination.";
                document.getElementById('checkInDateerror').innerHTML = "Please select the checkInDate.";
                document.getElementById('checkOutDateerror').innerHTML = "Please select the checkOutDate.";
                document.getElementById('guesterror').innerHTML = "Please select the guest Date.";
                document.getElementById('roomerror').innerHTML = "Please select the number of Room.";
                document.getElementById('destinationerror').style.color = "red";
                document.getElementById('checkInDateerror').style.color = "red";
                document.getElementById('checkOutDateerror').style.color = "red";
                document.getElementById('guesterror').style.color = "red";
                document.getElementById('roomerror').style.color = "red";
                hasErrors = true;
            }

            // Stop if there are errors
            if (hasErrors) {
                return; // Prevent further actions if validation fails
            }
            

            fetch('http://localhost:3000/submit-hotel-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hotelbooking)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Booking response:', data);
                var toastLiveExample = document.getElementById('liveToast');
                var toast = new bootstrap.Toast(toastLiveExample);
                toast.show();
                setTimeout(() => {
                    const params = new URLSearchParams(hotelbooking).toString();
                    window.location.href = `./bookingpage/hotel.html?${params}`; // Pass parameters via URL
                }, 1000);
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
