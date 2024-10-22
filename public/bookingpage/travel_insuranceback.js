let travelinsuranceobject = {};

// Fetch travel insurance data
function fetchtravelinsurance() {
    fetch('http://localhost:3000/travelinsurancedropdown')
    .then(response => response.json())
    .then(data => {
        travelinsuranceobject = {
            travelinsurance: data
        };
        console.log('travelinsurance Data Object:', travelinsuranceobject);
        processtravelinsuranceData(travelinsuranceobject);  // Call processtravelinsuranceData after fetching the data
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Process and display travel insurance data
function processtravelinsuranceData(data) {
    console.log('Processing insurance Data:', data.travelinsurance);
    const insuranceDropdown = document.getElementById('insurancetypeback');
    data.travelinsurance.forEach(travelinsurance => {
        const option1 = `<option value="${travelinsurance.insurance_type}">${travelinsurance.insurance_type}</option>`;
        const option2=`<option value="${travelinsurance.purpose_of_travel}">${travelinsurance.purpose_of_travel}</option>`;
        insuranceDropdown.innerHTML += option1;
        document.getElementById("purposeoftravelback").innerHTML += option2;
    });
}

// Call fetchtravelinsurance to fetch and process data
fetchtravelinsurance();

let travel_user_fullname;
let travel_user_email_travels;
let travel_user_traveldestination_travels;
let travel_user_traveldate_travels;
let travel_user_insuranceType_travels;
let travel_user_travelpurpose_travels
console.log( document.getElementById("traveldate_id"))

function setSelectedValues(){
    const locationpath = window.location.search;
    const urlsearch = new URLSearchParams(locationpath);
    travel_user_fullname = urlsearch.get('user_fullName_travels');
    travel_user_email_travels = urlsearch.get('user_email_travels');
    travel_user_traveldestination_travels = urlsearch.get('user_traveldestination_travels');
    travel_user_traveldate_travels = urlsearch.get('user_traveldate_travels');
    
    travel_user_insuranceType_travels = urlsearch.get('user_insuranceType_travels');
    travel_user_travelpurpose_travels = urlsearch.get('user_travelPurpose_travels');
    // Assuming you have already defined `forex_card_currency` somewhere in your code
    // const currencyElements = document.querySelectorAll('.currency_h');

    // currencyElements.forEach((element) => {
    //     element.innerHTML = forex_card_currency; // Set inner HTML for each element
    // });


     // Debugging

    if (travel_user_fullname) {
        document.getElementById("fullname_id").value = travel_user_fullname;
    }
    if (travel_user_email_travels) {
        document.getElementById("email_id").value = travel_user_email_travels;
    }
    if (travel_user_traveldestination_travels) {
        document.getElementById("traveldestination_id").value = travel_user_traveldestination_travels;
    }
    if (travel_user_traveldate_travels) {
        document.getElementById("traveldate_id").value = travel_user_traveldate_travels ;
    
    }
    if (travel_user_insuranceType_travels) {
        document.getElementById("insurancetypeback").value = travel_user_insuranceType_travels;
    }
    if (travel_user_travelpurpose_travels) {
        document.getElementById("purposeoftravelback").value = travel_user_travelpurpose_travels;
    }

    return {
        travel_user_fullname, travel_user_email_travels, travel_user_traveldestination_travels, travel_user_traveldate_travels, travel_user_insuranceType_travels, travel_user_travelpurpose_travels
    };
    
}
setSelectedValues()
document.addEventListener("DOMContentLoaded", function() {
    const searchBtntravelinsurance = document.getElementById('searchbuttonclick');
    if (searchBtntravelinsurance) {
        searchBtntravelinsurance.addEventListener("click", handleCheckboxFilter);
    }
});

function handleCheckboxFilter() {
    const purpose_of_travels = document.getElementById('purposeoftravelback').value;
    const leisure = document.querySelectorAll('.leisure');
    const study = document.querySelectorAll('.study');
    const business = document.querySelectorAll('.business');

    // Hide all home delivery and pickup options initially
    leisure.forEach(travelinsurance => {
        travelinsurance.classList.add('hidden');
        travelinsurance.classList.remove('visible');
    });
    
    study.forEach(travelinsurance => {
        travelinsurance.classList.add('hidden');
        travelinsurance.classList.remove('visible');
    });

    // Show the appropriate section based on forex_delivery value
    if (purpose_of_travels === 'leisure') {  // Adjust the condition based on the actual value representing home delivery
        leisure.forEach(travelinsurance => {
            travelinsurance.classList.add('hidden');
            travelinsurance.classList.remove('visible');
        });
    } else if (purpose_of_travels === 'study') {  // Adjust the condition based on the actual value representing pickup
        study.forEach(travelinsurance => {
            travelinsurance.classList.remove('hidden');
            travelinsurance.classList.add('visible');
        });
    } else if (purpose_of_travels === 'business') {
        business.forEach(travelinsurance => {
            travelinsurance.classList.remove('hidden');
            travelinsurance.classList.add('visible');
        });
    }
    // const currencyElements = document.querySelectorAll('.currency_h');
    // const currency_forex=document.getElementById("forex_currency").value;
    // currencyElements.forEach((element) => {
    //     element.innerHTML = currency_forex; // Set inner HTML for each element
    // });
}
handleCheckboxFilter()
