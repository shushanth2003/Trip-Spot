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
    const destinationDropdown = document.getElementById('train_fromstationback');
    
    
    // Clear previous options
    destinationDropdown.innerHTML = '';

    data.trains.forEach(train => {
        const opt1 = `<option value="${train.from_station}">${train.from_station}</option>`;
        const opt2=`<option value="${train.from_station}">${train.from_station}</option>`
        destinationDropdown.innerHTML += opt1;
        document.getElementById('train_tostationback').innerHTML += opt2;
    });
    setSelectedValues()
}
fetchTrainData()

function setSelectedValues(){
    const locationpath = window.location.search;
    const urlsearch = new URLSearchParams(locationpath);
    const fromStation_trains_back = urlsearch.get('user_fromStation_trains');
    const toStation_train_back = urlsearch.get('user_toStation_trains');
    const departureDate_train_back = urlsearch.get('user_departureDate_trains');
    const returnDate_train_back= urlsearch.get('user_returnDate_trains');
    const classType_train_back = urlsearch.get('user_classType_trains');
    const passengers_train_back = urlsearch.get('user_passengers_trains');
    
    document.querySelectorAll('span.departure').forEach(span => {
        span.innerHTML = fromStation_trains_back;
    });
    
    document.querySelectorAll('span.arrival').forEach(span => {
        span.innerHTML = toStation_train_back;
    });
    if (fromStation_trains_back) {
        document.getElementById("train_fromstationback").value = fromStation_trains_back;
    }
    if (toStation_train_back) {
        document.getElementById("train_tostationback").value= toStation_train_back;
    }
    if (departureDate_train_back) {
        document.getElementById("train_departuredate").value = departureDate_train_back;
    }
    if (returnDate_train_back) {
        document.getElementById("train_returndate").value = returnDate_train_back;
    }
    if (classType_train_back) {
        document.getElementById("train_passengers").value = passengers_train_back;
    }
    return {fromStation_trains_back,toStation_train_back,departureDate_train_back,returnDate_train_back,passengers_train_back}
}
// -------------------------filter----------------------------
const express_checkbox = document.getElementById("express");
const superfast_checkbox = document.getElementById("superfast");
const sleeper_checkbox = document.getElementById("sleeper");

express_checkbox.addEventListener("click", handlestarcheckbox);
superfast_checkbox.addEventListener("click",handlestarcheckbox);
sleeper_checkbox.addEventListener("click",handlestarcheckbox);

function handlestarcheckbox() {
    const expresschecked = express_checkbox.checked;
    const superfastchecked = superfast_checkbox.checked;
    const sleeperchecked = sleeper_checkbox.checked;

    // Hide all trains initially
    const allItem = document.querySelectorAll(".train-card");

    allItem.forEach(item => {
        const express_container = item.classList.contains("train_express");
        const superfast_container = item.classList.contains("train_superfast");
        const sleeper_container = item.classList.contains("train_sleeper");
        let shouldShow = false;

        if (expresschecked && express_container) {
            shouldShow = true;
        }
        if (superfastchecked && superfast_container) {
            shouldShow = true;
        }
        if (sleeperchecked && sleeper_container) {
            shouldShow = true;
        }

        // If no checkboxes are checked, show all items
        if (!expresschecked && !superfastchecked && !sleeperchecked) {
            shouldShow = true;
        }
        if (shouldShow) {
            item.style.display = "flex";  // Show the card
        } else {
            item.style.display = "none";  // Hide the card
        }
    });
}


handlestarcheckbox()

document.getElementById("trainsbutton").addEventListener('click',getdatatrain);
function getdatatrain(){
    const search_train_departure=document.getElementById('train_fromstationback').value;
    const search_train_arrival=document.getElementById('train_tostationback').value;
    document.querySelectorAll('span.departures').forEach(span => {
        span.innerHTML = search_train_departure;
    });
    
    document.querySelectorAll('span.arrivals').forEach(span => {
        span.innerHTML = search_train_arrival;
    });
}