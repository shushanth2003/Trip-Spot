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
    const currencyDropdown = document.getElementById('currencyType');
    data.forexcard.forEach(forexcard => {
        const opt1 = `<option value="${forexcard.currency_short_name}">${forexcard.currency_short_name}</option>`;
        currencyDropdown.innerHTML += opt1;
    });
}

// Call fetchhotelData to fetch and process data
fetchforexcard();

document.addEventListener('DOMContentLoaded', function() {
    const forexbuttons = document.getElementById("forexbutton");
    
    if (forexbuttons) {
        forexbuttons.addEventListener("click", function(event) {
            event.preventDefault();
            
            const currencyTypes = document.getElementById("currencyType").value;
            const amounts = document.getElementById("amount").value;
            const forexcards = document.getElementById("forexCard").value;
            const deliveryOptions = document.getElementById("deliveryOption").value;

            const forexcardbooking = {
                user_currencyTypes: currencyTypes,
                user_amounts: amounts,
                user_forexcards: forexcards,
                user_deliveryOptions: deliveryOptions
            };
            let hasErrors = false;  // Fix this typo

            // Reset error messages
            document.getElementById('currencyTypeerror').innerHTML = "";
            document.getElementById('amounterror').innerHTML = "";
            document.getElementById('forexcarderror').innerHTML = "";
            document.getElementById('deliveryOptionerror').innerHTML = "";

            // Validate that all required fields are filled
            if (!forexcardbooking.user_currencyTypes.trim()) {
                document.getElementById('currencyTypeerror').innerHTML = "Please select the Currency Type.";
                document.getElementById('currencyTypeerror').style.color = "red";
                hasErrors = true;
            }
            if (!forexcardbooking.user_amounts.trim()) {
                document.getElementById('amounterror').innerHTML = "Please select the Amount.";
                document.getElementById('amounterror').style.color = "red";
                hasErrors = true;
            }
            if (!forexcardbooking.user_forexcards.trim()) {
                document.getElementById('forexcarderror').innerHTML = "Please select the Forex card.";
                document.getElementById('forexcarderror').style.color = "red";
                hasErrors = true;
            }
            if (!forexcardbooking.user_deliveryOptions.trim()) {
                document.getElementById('deliveryOptionerror').innerHTML = "Please select the delivery option.";
                document.getElementById('deliveryOptionerror').style.color = "red";
                hasErrors = true;
            }

            // Stop if there are errors
            if (hasErrors) {
                return; // Prevent further actions if validation fails
            }

            // If no errors, proceed with the API call
            fetch('http://localhost:3000/submit-forexcard-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(forexcardbooking)
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
                
                // Redirect after the toast is shown
                setTimeout(() => {
                    const paramString = new URLSearchParams(forexcardbooking).toString(); 
                    window.location.href = `./bookingpage/forexcard.html?${paramString}`;
                }, 1000); // Adjust the delay as needed
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});
