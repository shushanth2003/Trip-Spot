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
        const opt1 = `<option value=${homevilla.destination}>${homevilla.destination}</option>`;
        document.getElementById('destination_homestay_back').innerHTML += opt1;
    });
    setSelectedValues()
}
fetchhomestayVillas();

let homestay_destination;
let homestay_checkindate;
let homestay_checkoutdate;
let homestay_guests;
let homestay_property_type;
let homestay_rooms;

function setSelectedValues(){
    const locationpath=window.location.search;
    const urlsearch=new URLSearchParams(locationpath);
    homestay_destination = urlsearch.get('user_destination_homestays');
    homestay_checkindate = urlsearch.get('user_checkInDate_homestays');
    homestay_checkoutdate = urlsearch.get('user_checkOutDate_homestays');
    homestay_guests = urlsearch.get('user_guests_homestays');
    homestay_property_type = urlsearch.get('user_propertyTypes_homestays');
    console.log(homestay_property_type);
    homestay_rooms = urlsearch.get('user_rooms_homestays');

    if (homestay_destination) {
        document.getElementById("destination_homestay_back").value = homestay_destination;
    }
    if (homestay_checkindate) {
        document.getElementById("homestay_checkIndate").value = homestay_checkindate;
    }
    if (homestay_checkoutdate) {
        document.getElementById("homestay_checkOutdate").value = homestay_checkoutdate;
    }
    if (homestay_guests) {
        document.getElementById("homestay_guest").value = homestay_guests;
    }
    if (homestay_property_type) {
        document.getElementById("homestay_property_type").value = homestay_property_type;
    }    
    if (homestay_rooms) {
        document.getElementById("homestay_rooms").value = homestay_rooms;
    }

    return {
        homestay_destination,
        homestay_checkindate,
        homestay_checkoutdate,
        homestay_guests,
        homestay_property_type,
        homestay_rooms
    };
}
setSelectedValues()
// // ------------------------property value--------------------------------
const villa = document.getElementById("type-villa");
const homestay = document.getElementById("type-homestay");
const apartment = document.getElementById("type-apartment");

// ---------------------------------amenities-------------------------------
const pool = document.getElementById("amenities-pool");
const gym = document.getElementById("amenities-gym");
const parking = document.getElementById("amenities-parking");

villa.addEventListener("change", handleCheckboxFilter);
homestay.addEventListener("change", handleCheckboxFilter);
apartment.addEventListener("change", handleCheckboxFilter);

pool.addEventListener("change", handleCheckboxFilter);
gym.addEventListener("change", handleCheckboxFilter);
parking.addEventListener("change", handleCheckboxFilter);

function handleCheckboxFilter() {
    const allItems = document.querySelectorAll(".holiday-card");

    allItems.forEach(item => {
        const isVilla = item.classList.contains('villa');
        const isHomestay = item.classList.contains('homestay');
        const isApartment = item.classList.contains('apartment');
        const hasPool = item.classList.contains('pool');
        const hasGym = item.classList.contains('gym');
        const hasParking = item.classList.contains('parking');

        // Check the status of checkboxes
        const villaChecked = villa.checked;
        const homestayChecked = homestay.checked;
        const apartmentChecked = apartment.checked;
        const poolChecked = pool.checked;
        const gymChecked = gym.checked;
        const parkingChecked = parking.checked;

        // Check if item should be visible based on property type and amenities
        let showByProperty = (
            (!villaChecked && !homestayChecked && !apartmentChecked) || // Show all if none checked
            (villaChecked && isVilla) ||
            (homestayChecked && isHomestay) ||
            (apartmentChecked && isApartment)
        ); 

        let showByAmenities = (
            (!poolChecked && !gymChecked && !parkingChecked) || // Show all if none checked
            (poolChecked && hasPool) ||
            (gymChecked && hasGym) ||
            (parkingChecked && hasParking)
        );

        // Only show if both property type and amenities match the filter
        if (showByProperty && showByAmenities) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}
// --------------------------------------param getting value---------
document.getElementById('homestaybuttons').addEventListener('click', function() {
    const homestaycards = document.querySelectorAll('.holiday-card');

    // Debug: Log the destination and cards for verification
    console.log('Destination:', homestay_destination);
    console.log('Hotel Cards Count:', homestaycards.length);

    // Reset visibility for all cards first
    homestaycards.forEach(card => {
        card.classList.add('hidden'); // Hide all cards initially
        card.classList.remove('visible'); // Ensure visible class is removed
    });

    // Show only the matching card
    let found = false; // Flag to check if any card is displayed
    homestaycards.forEach(card => {
        const homestayElement = card.querySelector('span');

        if (homestayElement && homestayElement.textContent === homestay_destination) {
            card.classList.remove('hidden'); // Show the matching card
            card.classList.add('visible'); // Add visible class
            found = true; // Set flag if a match is found
        }
    });

    // Debug: Log if a hotel was found
    if (!found) {
        console.log('No matching hotel found for destination:', homestay_destination);
    }
    // Add event listener for the select element to trigger filtering
document.getElementById('destination_homestay_back').addEventListener('change', function() {
    const destination_homestayback = this.value; // Get the selected value
    const homestaynav = document.querySelectorAll('.holiday-card'); // Select all cards

    homestaynav.forEach(card => {
        card.classList.add('hidden'); // Hide all cards initially
        card.classList.remove('visible'); // Ensure visible class is removed
    });

    // Show only the matching card
    let found = false; // Flag to check if any card is displayed
    homestaynav.forEach(card => {
        const homestayElement = card.querySelector('.home');

        // Check if the card contains the destination as part of its content
        if (homestayElement && homestayElement.textContent.includes(destination_homestayback)) {
            card.classList.remove('hidden'); // Show the matching card
            card.classList.add('visible'); // Add visible class
            found = true; // Set flag if a match is found
        }
    });

    // Optionally, you could handle the case where no cards match the selection
    if (!found) {
        console.log("No matching cards found");
    }
});

});
// --------------------------checking with container--------------------------
