let forexcardobject = {};

// Fetch hotel data
function fetchforexcard() {
    fetch('http://localhost:3000/forexdropdown')
    .then(response => response.json())
    .then(data => {
        forexcardobject = {
            forexcard: data
        };
        console.log('forexcard Data Object:', forexcardobject);
        processforexcardData(forexcardobject);  // Call processHotelData after fetching the data
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Process and display hotel data
function processforexcardData(data) {
    console.log('Processing forexcard Data:', data.forexcard);
    const currencyDropdown = document.getElementById('forex_currency');
    data.forexcard.forEach(forexcard => {
        const opt1 = `<option value="${forexcard.currency_short_name}">${forexcard.currency_short_name}</option>`;
        currencyDropdown.innerHTML += opt1;
    });
}

// Call fetchhotelData to fetch and process data
fetchforexcard();

let forex_card_currency;
let amount;
let need_forex_card;
let delivery_option;

function setSelectedValues(){
    const locationpath = window.location.search;
    const urlsearch = new URLSearchParams(locationpath);
    forex_card_currency = urlsearch.get('user_currencyTypes');
    
    amount = urlsearch.get('user_amounts');
    need_forex_card = urlsearch.get('user_forexcards');
    
    delivery_option = urlsearch.get('user_deliveryOptions');
    // Assuming you have already defined `forex_card_currency` somewhere in your code
    const currencyElements = document.querySelectorAll('.currency_h');

    currencyElements.forEach((element) => {
        element.innerHTML = forex_card_currency; // Set inner HTML for each element
    });


     // Debugging

    if (forex_card_currency) {
        document.getElementById("forex_currency").value = forex_card_currency;
    }
    if (amount) {
        document.getElementById("forex_amount").value = amount;
    }
    if (need_forex_card) {
        document.getElementById("forex_card").value = need_forex_card;
    }
    if (delivery_option) {
        document.getElementById("forex_delivery").value = delivery_option;
    }

    return {
        forex_card_currency, amount, need_forex_card, delivery_option
    };
    
}
setSelectedValues()

document.addEventListener("DOMContentLoaded", function() {
    const searchBtnForex = document.getElementById('searchbtnforex');
    if (searchBtnForex) {
        searchBtnForex.addEventListener("click", handleCheckboxFilter);
    }
});

function handleCheckboxFilter() {
    const forex_delivery = document.getElementById('forex_delivery').value;
    const check_home_delivery = document.querySelectorAll('.home');
    const pick_up_from_branch = document.querySelectorAll('.pickup');

    // Hide all home delivery and pickup options initially
    check_home_delivery.forEach(forex => {
        forex.classList.add('hidden');
        forex.classList.remove('visible');
    });
    
    pick_up_from_branch.forEach(forex => {
        forex.classList.add('hidden');
        forex.classList.remove('visible');
    });

    // Show the appropriate section based on forex_delivery value
    if (forex_delivery === 'home') {  // Adjust the condition based on the actual value representing home delivery
        check_home_delivery.forEach(forex => {
            forex.classList.remove('hidden');
            forex.classList.add('visible');
        });
    } else if (forex_delivery === 'pickup') {  // Adjust the condition based on the actual value representing pickup
        pick_up_from_branch.forEach(forex => {
            forex.classList.remove('hidden');
            forex.classList.add('visible');
        });
    }
    const currencyElements = document.querySelectorAll('.currency_h');
    const currency_forex=document.getElementById("forex_currency").value;
    currencyElements.forEach((element) => {
        element.innerHTML = currency_forex; // Set inner HTML for each element
    });
}
