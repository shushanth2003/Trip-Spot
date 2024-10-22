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
    const destinationDropdown = document.getElementById('hotel_destination');

    data.hotels.forEach(hotel => {
        const opt1 = `<option value="${hotel.hotel_name}">${hotel.hotel_name}</option>`;
        destinationDropdown.innerHTML += opt1;
    });
    setSelectedValues();
    const get_data_hotels = hotelDataobject.hotels;

// Find the hotel with the name "Hotel Grand"
    const hotelGrand = get_data_hotels.find(hotel => hotel.hotel_name === 'Hotel Grand');
    const hotelElite= get_data_hotels.find(hotel=>hotel.hotel_name === 'Hotel Elite');
    const hotelParadise= get_data_hotels.find(hotel=>hotel.hotel_name === 'Hotel Paradise');
    const hotelComfort= get_data_hotels.find(hotel=>hotel.hotel_name === 'Hotel Comfort');
    const hotelLuxury=get_data_hotels.find(hotel=>hotel.hotel_name==="Hotel Luxury");
    const hotelSimplestay=get_data_hotels.find(hotel=>hotel.hotel_name==="Hotel Simply Stay");
    const hotelBudgetInn=get_data_hotels.find(hotel=>hotel.hotel_name==="Hotel Budget Inn");

// Save the hotel_name in a variable
    let hotelNameValue1,hotelNameValue2,hotelNameValue3,hotelNameValue4,hotelNameValue5,hotelNameValue6,hotelNameValue7;
    if (hotelGrand) {
        hotelNameValue1 = hotelGrand.hotel_name;  // Save "Hotel Grand" to hotelNameValue
    }
    const hotelgrands=hotelNameValue1;
    if (hotelElite){
        hotelNameValue2=hotelElite.hotel_name;
    } // This will output "Hotel Grand"
    const hotelelites=hotelNameValue2;
    if (hotelParadise) {
        hotelNameValue3 = hotelParadise.hotel_name;  // Save "Hotel Grand" to hotelNameValue
    }
    const hotelparadises=hotelNameValue3; 
    if (hotelComfort) {
        hotelNameValue4 = hotelComfort.hotel_name;  // Save "Hotel Grand" to hotelNameValue
    }
    const hotelcomforts=hotelNameValue4; 
    if (hotelLuxury) {
        hotelNameValue5 = hotelLuxury.hotel_name;  // Save "Hotel Grand" to hotelNameValue
    }
    const hotelLuxurys=hotelNameValue5; 
    if (hotelSimplestay) {
        hotelNameValue6 = hotelSimplestay.hotel_name;  // Save "Hotel Grand" to hotelNameValue
    }
    const hotelsimplestays=hotelNameValue6;
    if (hotelBudgetInn) {
        hotelNameValue7 = hotelBudgetInn.hotel_name;  // Save "Hotel Grand" to hotelNameValue
    }
    const hotelbudgetinn=hotelNameValue7;
      
}
// Call fetchhotelData to fetch and process data
fetchhotelData();
// Access hotel data directly
let hotel_user_destination;
let hotel_user_checkInDate;
let hotel_user_checkOutDate;
let hotel_user_guest;
let hotel_user_room;
function setSelectedValues(){
    const locationpath=window.location.search;
    const urlsearch=new URLSearchParams(locationpath);
    hotel_user_destination=urlsearch.get('user_destination');
    hotel_user_checkInDate=urlsearch.get('user_checkInDate');
    hotel_user_checkOutDate=urlsearch.get('user_checkOutDate');
    hotel_user_guest=urlsearch.get('user_guest');
    hotel_user_room=urlsearch.get('user_room');

    if (hotel_user_destination) {
        document.getElementById("hotel_destination").value = hotel_user_destination;
    }
    if (hotel_user_checkInDate) {
        document.getElementById("hotel_checkIndate").value= hotel_user_checkInDate;
    }
    if (hotel_user_checkOutDate) {
        document.getElementById("hotel_checkOutdate").value = hotel_user_checkOutDate;
    }
    if (hotel_user_guest) {
        document.getElementById("hotel_guest").value = hotel_user_guest;
    }
    if (hotel_user_room) {
        document.getElementById("hotel_room").value = hotel_user_room;
    }
    return {hotel_user_destination,hotel_user_checkInDate,hotel_user_checkOutDate,hotel_user_guest,hotel_user_room}
}
setSelectedValues()

// // -----------------------------show particular container--------------------
document.getElementById('searchBtn').addEventListener('click', function() {
    const hotelCards = document.querySelectorAll('.hotel-card');

    // Debug: Log the destination and cards for verification
    console.log('Destination:', hotel_user_destination);
    console.log('Hotel Cards Count:', hotelCards.length);

    // Reset visibility for all cards first
    hotelCards.forEach(card => {
        card.classList.add('hidden'); // Hide all cards initially
        card.classList.remove('visible'); // Ensure visible class is removed
    });

    // Show only the matching card
    let found = false; // Flag to check if any card is displayed
    hotelCards.forEach(card => {
        const hotelNameElement = card.querySelector('h5');

        if (hotelNameElement && hotelNameElement.textContent.trim() === hotel_user_destination.trim()) {
            card.classList.remove('hidden'); // Show the matching card
            card.classList.add('visible'); // Add visible class
            found = true; // Set flag if a match is found
        }
    });

    // Debug: Log if a hotel was found
    if (!found) {
        console.log('No matching hotel found for destination:', hotel_user_destination);
    }
});

// -------------------------------------filter----------------------------------
const star1checkbox = document.getElementById("star-1");
const star2checkbox = document.getElementById("star-2");
const star3checkbox = document.getElementById("star-3");
const star4checkbox = document.getElementById("star-4");
const star5checkbox = document.getElementById("star-5");
star1checkbox.addEventListener("click", handlestarcheckbox);
star2checkbox.addEventListener("click",handlestarcheckbox);
star3checkbox.addEventListener("click",handlestarcheckbox);
star4checkbox.addEventListener("click",handlestarcheckbox);
star5checkbox.addEventListener("click",handlestarcheckbox);
function handlestarcheckbox() {
    const star1container = document.querySelectorAll(".star1");
    const star1checked = star1checkbox.checked;
    const star2container = document.querySelectorAll(".star2");
    const star2checked = star2checkbox.checked;
    const star3container = document.querySelectorAll(".star3");
    const star3checked = star3checkbox.checked;
    const star4container = document.querySelectorAll(".star4");
    const star4checked = star4checkbox.checked;
    const star5container = document.querySelectorAll(".star5");
    const star5checked = star5checkbox.checked;

    if(!star1checked && !star2checked && !star3checked && !star4checked && !star5checked){
        star1container.forEach(hotels => {
            hotels.classList.remove('hidden');
            hotels.classList.add('visible');
        });
        star2container.forEach(hotels => {
            hotels.classList.remove('hidden');
            hotels.classList.add('visible');
        });
        star3container.forEach(hotels => {
            hotels.classList.remove('hidden');
            hotels.classList.add('visible');
        });
        star4container.forEach(hotels => {
            hotels.classList.remove('hidden');
            hotels.classList.add('visible');
        });
        star5container.forEach(hotels => {
            hotels.classList.remove('hidden');
            hotels.classList.add('visible');
        });
    }else{
        star1container.forEach(hotels => {
            if (star1checked) {
                hotels.classList.remove('hidden');
                hotels.classList.add('visible');
            } else {
                hotels.classList.remove('visible');
                hotels.classList.add('hidden');
            }
        });
        star2container.forEach(hotels => {
            if (star2checked) {
                hotels.classList.remove('hidden');
                hotels.classList.add('visible');
            } else {
                hotels.classList.remove('visible');
                hotels.classList.add('hidden');
            }
        });
        star3container.forEach(hotels => {
            if (star3checked) {
                hotels.classList.remove('hidden');
                hotels.classList.add('visible');
            } else {
                hotels.classList.remove('visible');
                hotels.classList.add('hidden');
            }
        });
        star4container.forEach(hotels => {
            if (star4checked) {
                hotels.classList.remove('hidden');
                hotels.classList.add('visible');
            } else {
                hotels.classList.remove('visible');
                hotels.classList.add('hidden');
            }
        });
        star5container.forEach(hotels => {
            if (star5checked) {
                hotels.classList.remove('hidden');
                hotels.classList.add('visible');
            } else {
                hotels.classList.remove('visible');
                hotels.classList.add('hidden');
            }
        });
    }
}



