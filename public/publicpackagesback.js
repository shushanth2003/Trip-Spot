let holidayPackagesobject = {};

// Fetch hotel data
function fetchholidaypackage() {
    fetch('http://localhost:3000/holidaypackage')
    .then(response => response.json())
    .then(data => {
        holidayPackageobject = {
            holidaypackage: data
        };
        console.log('HolidayPackages Data Object:', holidayPackageobject);
        processholidaypackagesData(holidayPackageobject);  // Call processHotelData after fetching the data
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Process and display hotel data
function processholidaypackagesData(data) {
    console.log('Processing Holidaypackages Data:', data.holidaypackage);
    const destinationDropdown = document.getElementById('destination_holidaypackages');
    data.holidaypackage.forEach(holidaypackage => {
        const opt1 = `<option value="${holidaypackage.vacation_name}">${holidaypackage.vacation_name}</option>`;
        destinationDropdown.innerHTML += opt1;
    });
    setSelectedValues()
}

// Call fetchhotelData to fetch and process data
fetchholidaypackage(); 

let holidaypackages_destination;
let holidaypackages_startdate;
let holidaypackages_enddate;
let holidaypackages_guests;
let holidaypackages_package_type;
let holidaypackage_maxbudgets;

function setSelectedValues(){
    const locationpath=window.location.search;
    const urlsearch=new URLSearchParams(locationpath);
    holidaypackages_destination = urlsearch.get('user_destination_holidaypackage');
    holidaypackages_startdate = urlsearch.get('user_startDate_holidaypackage');
    holidaypackages_enddate = urlsearch.get('user_endDate_holidaypackage');
    holidaypackages_guests = urlsearch.get('user_guests_holidaypackage');
    holidaypackages_package_type = urlsearch.get('user_packageType_holidaypackage');
    holidaypackage_maxbudgets = urlsearch.get('user_budget_holidaypackage');
    if (holidaypackages_destination) {
        document.getElementById("destination_holidaypackages").value = holidaypackages_destination;
    }
    if (holidaypackages_startdate) {
        document.getElementById("startdate_holidaypackage").value = holidaypackages_startdate;
    }
    if (holidaypackages_enddate) {
        document.getElementById("enddate_holidaypackage").value = holidaypackages_enddate;
    }
    if (holidaypackages_guests) {
        document.getElementById("guests_holidaypackage").value = holidaypackages_guests;
    }
    if (holidaypackages_package_type) {
        document.getElementById("package_type_holidaypackage").value = holidaypackages_package_type;
    }    
    if (holidaypackage_maxbudgets) {
        document.getElementById("holidaypackages_maxbudgets").value = holidaypackage_maxbudgets;
    }

    return {
        holidaypackages_destination,
        holidaypackages_startdate,
        holidaypackages_enddate,
        holidaypackages_guests,
        holidaypackages_package_type,
        holidaypackage_maxbudgets
    };
}
setSelectedValues()
// // // ------------------------Filter--------------------------------
const holiday_adventure = document.getElementById("type-adventure");
const holiday_relaxation = document.getElementById("type-relaxation");
const holiday_romantic = document.getElementById("type-romantic");

// // ---------------------------------amenities-------------------------------
// const pool = document.getElementById("amenities-pool");
// const gym = document.getElementById("amenities-gym");
// const parking = document.getElementById("amenities-parking");

holiday_adventure.addEventListener("change", handleCheckboxFilter);
holiday_relaxation.addEventListener("change", handleCheckboxFilter);
holiday_romantic.addEventListener("change", handleCheckboxFilter);

// pool.addEventListener("change", handleCheckboxFilter);
// gym.addEventListener("change", handleCheckboxFilter);
// parking.addEventListener("change", handleCheckboxFilter);

function handleCheckboxFilter() {
    const allItems = document.querySelectorAll(".holiday-card");

    // Get the checkbox status for each type
    const isholiday_adventure_Checked = holiday_adventure.checked;
    const isholiday_relaxation_Checked = holiday_relaxation.checked;
    const isholiday_romantic_Checked = holiday_romantic.checked;

    allItems.forEach(item => {
        const isholiday_adventure = item.classList.contains('adventure');
        const isholiday_relaxation = item.classList.contains('relaxation');
        const isholiday_romantic = item.classList.contains('romantic');

        // Logic to show/hide items based on checkbox filters
        let shouldShow = false;

        if (isholiday_adventure_Checked && isholiday_adventure) {
            shouldShow = true;
        }
        if (isholiday_relaxation_Checked && isholiday_relaxation) {
            shouldShow = true;
        }
        if (isholiday_romantic_Checked && isholiday_romantic) {
            shouldShow = true;
        }

        // If no checkboxes are checked, show all items
        if (!isholiday_adventure_Checked && !isholiday_relaxation_Checked && !isholiday_romantic_Checked) {
            shouldShow = true;
        }

        // Show or hide the item
        if (shouldShow) {
            item.style.display = "flex";  // Show the card
        } else {
            item.style.display = "none";  // Hide the card
        }
    });
}

// --------------------------------------param getting value---------
document.getElementById('holidaypackage_btn').addEventListener('click', function() {
    const holidaycards = document.querySelectorAll('.holiday-card');

    // Debug: Log the destination and cards for verification
    console.log('Destination:', holidaypackages_destination);
    console.log('Hotel Cards Count:', holidaycards.length);

    // Reset visibility for all cards first
    holidaycards.forEach(cards => {
        cards.classList.add('hidden'); // Hide all cards initially
        cards.classList.remove('visible'); // Ensure visible class is removed
    });

    // Show only the matching card
    let found = false; // Flag to check if any card is displayed
    holidaycards.forEach(card => {
        const holidaysElement = card.querySelector('h5');

        if (holidaysElement && holidaysElement.textContent === holidaypackages_destination) {
            card.classList.remove('hidden'); // Show the matching card
            card.classList.add('visible'); // Add visible class
            found = true; // Set flag if a match is found
        }
    });

    // Debug: Log if a hotel was found
    if (!found) {
        console.log('No matching hotel found for destination:', holidaypackages_destination);
    }

    // Add event listener for the select element to trigger filtering
document.getElementById('destination_holidaypackages').addEventListener('change', function() {
    const destination_holidayspackages = this.value; // Get the selected value
    const holidaypackagesnav = document.querySelectorAll('.holiday-card'); // Select all cards

    holidaypackagesnav.forEach(card => {
        card.classList.add('hidden'); // Hide all cards initially
        card.classList.remove('visible'); // Ensure visible class is removed
    });

    // Show only the matching card
    let found = false; // Flag to check if any card is displayed
    holidaypackagesnav.forEach(card => {
        const holidaypackagesElement = card.querySelector('.holiday');

        // Check if the card contains the destination as part of its content
        if (holidaypackagesElement && holidaypackagesElement.textContent.includes(destination_holidayspackages)) {
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