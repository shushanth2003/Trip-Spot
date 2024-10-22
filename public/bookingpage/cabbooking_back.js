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
    const carDropdown = document.getElementById('cabtypedropdown');
    
    // Clear previous options
    carDropdown.innerHTML = '';

    data.cabs.forEach(cab => {
        const opt1 = `<option value="${cab.cartype}">${cab.cartype}</option>`;
        carDropdown.innerHTML += opt1;
    });
}

// Fetch train data on page load
fetchcabData();

let pickuplocation;
let dropofflocation;
let pickupdate;
let pickuptime;
let cabtype;
let passengers;

function setSelectedValues(){
    const locationpath=window.location.search;
    const urlsearch= new URLSearchParams(locationpath);
    pickuplocation=urlsearch.get('user_pickupLocation');
    dropofflocation=urlsearch.get('user_dropoffLocation');
    pickupdate=urlsearch.get('user_pickupDate');
    pickuptime=urlsearch.get('user_pickupTimes');
    cabtype=urlsearch.get('user_cabType');
    passengers=urlsearch.get('user_passenger');

    if (pickuplocation){
        document.getElementById("pick_up_location").value=pickuplocation;
    }
    if (dropofflocation){
        document.getElementById("drop_off_location").value=dropofflocation;
    }
    if(pickupdate){
        document.getElementById("pickup_date").value=pickupdate;
    }
    if(pickuptime){
        document.getElementById("pickup_time").value=pickuptime;
    }
    if(passengers){
        document.getElementById("passengers").value=passengers;
    }
    if(cabtype){
        document.getElementById("cabtypedropdown").value=cabtype;
    }
}
setSelectedValues()

document.addEventListener('DOMContentLoaded', function () {
    const sedanCheckbox = document.getElementById('sedan');
    const suvCheckbox = document.getElementById('suv');
    const cngCheckbox = document.getElementById('cng');
    const dieselCheckbox = document.getElementById('diesel');

    function filterCabs() {
        const sedanChecked = sedanCheckbox.checked;
        const suvChecked = suvCheckbox.checked;
        const cngChecked = cngCheckbox.checked;
        const dieselChecked = dieselCheckbox.checked;

        // If no checkboxes are selected, show all the cards
        const noFiltersApplied = !sedanChecked && !suvChecked && !cngChecked && !dieselChecked;

        document.querySelectorAll('.booking-card').forEach(card => {
            const isSedan = card.classList.contains('sedanss');
            const isSUV = card.classList.contains('suvss');
            const isCNG = card.classList.contains('cng');
            const isDiesel = card.classList.contains('diesel');

            if (noFiltersApplied || // Show all cards if no filters are selected
                (sedanChecked && isSedan) || 
                (suvChecked && isSUV) || 
                (cngChecked && isCNG) || 
                (dieselChecked && isDiesel)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    sedanCheckbox.addEventListener('change', filterCabs);
    suvCheckbox.addEventListener('change', filterCabs);
    cngCheckbox.addEventListener('change', filterCabs);
    dieselCheckbox.addEventListener('change', filterCabs);
});
const searchButton = document.getElementById("btn_cab"); // Get the button

searchButton.addEventListener('click', function () {
    const selectedCabType = document.getElementById("cabtypedropdown").value;
    console.log(selectedCabType) // Get the selected value and trim spaces
    const cabtypecards = document.querySelectorAll('.booking-card'); // Get all cab booking cards

    cabtypecards.forEach(cabs => {
        cabs.classList.add('hidden'); // Hide all cards by default
        cabs.classList.remove('visible');
    });

    let found = false;
    cabtypecards.forEach(cabs => {
        const cabtypeElement = cabs.querySelector('h5');
        console.log("having dataset",cabtypeElement); // Assuming the cab type is in an <h5> tag

        if (cabtypeElement && cabtypeElement.textContent.includes(selectedCabType)){
            cabs.classList.remove('hidden'); // Show the matching card
            cabs.classList.add('visible');
            found = true;
        }
    });

    if (!found) {
        console.log("No cabs found for the selected type.");
    }
});

 


