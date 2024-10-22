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
    const insuranceDropdown = document.getElementById('insuranceType_travel');
    data.travelinsurance.forEach(travelinsurance => {
        const option1 = `<option value="${travelinsurance.insurance_type}">${travelinsurance.insurance_type}</option>`;
        const option2=`<option value="${travelinsurance.purpose_of_travel}">${travelinsurance.purpose_of_travel}</option>`;
        insuranceDropdown.innerHTML += option1;
        document.getElementById("travelPurpose_travel").innerHTML += option2;
    });
}

// Call fetchtravelinsurance to fetch and process data
fetchtravelinsurance();


document.addEventListener('DOMContentLoaded', function() {
    const travelinsurancebuttons = document.getElementById("travelinsurancebutton");
    
    if (travelinsurancebuttons) {
        travelinsurancebuttons.addEventListener("click", function(event) {
            event.preventDefault();
            
            const fullName_travels = document.getElementById("fullName_travel").value;
            const email_travels = document.getElementById("email_travel").value;
            const traveldestination_travels = document.getElementById("travelDestination_travel").value;
            const traveldate_travels = document.getElementById("travelDate_travel").value;
            const insuranceType_travels = document.getElementById("insuranceType_travel").value;
            const travelPurpose_travels = document.getElementById("travelPurpose_travel").value;

            const travelinsurancebooking = {
                user_fullName_travels:fullName_travels,
                user_email_travels:email_travels,
                user_traveldestination_travels:traveldestination_travels,
                user_traveldate_travels:traveldate_travels,
                user_insuranceType_travels:insuranceType_travels,
                user_travelPurpose_travels:travelPurpose_travels
            };
            let hasErrors = false;  // Fix this typo


            // Validate that all required fields are filled
            if (!travelinsurancebooking.user_fullName_travels.trim()) {
                document.getElementById('fullnametravelinsurance_error').innerHTML = "Please enter the Full name.";
                document.getElementById('fullnametravelinsurance_error').style.color = "red";
                hasErrors = true;
            }
            if (!travelinsurancebooking.user_email_travels.trim()) {
                document.getElementById('emailerror').innerHTML = "Please enter the EmailID.";
                document.getElementById('emailerror').style.color = "red";
                hasErrors = true;
            }
            if (!travelinsurancebooking.user_traveldestination_travels.trim()) {
                document.getElementById('travelDestinationerror').innerHTML = "Please select the Forex card.";
                document.getElementById('travelDestinationerror').style.color = "red";
                hasErrors = true;
            }
            if (!travelinsurancebooking.user_traveldate_travels.trim()) {
                document.getElementById('traveldate_travelerror').innerHTML = "Please select the delivery option.";
                document.getElementById('traveldate_travelerror').style.color = "red";
                hasErrors = true;
            }
            if (!travelinsurancebooking.user_insuranceType_travels.trim()) {
                document.getElementById('traveldate_travelerror').innerHTML = "Please select the delivery option.";
                document.getElementById('deliveryOptionerror').style.color = "red";
                hasErrors = true;
            }
            if (!travelinsurancebooking.user_travelPurpose_travels.trim()) {
                document.getElementById('travelPurpose_travelid').innerHTML = "Please select the delivery option.";
                document.getElementById('travelPurpose_travelid').style.color = "red";
                hasErrors = true;
            }
            // Stop if there are errors
            if (hasErrors) {
                return; // Prevent further actions if validation fails
            }

            fetch('http://localhost:3000/submit-travelinsurance-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(travelinsurancebooking)
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

                setTimeout(() => {
                    const paramString = new URLSearchParams(travelinsurancebooking).toString(); 
                    window.location.href = `./bookingpage/travelinsurancebooking.html?${paramString}`;
                }, 1000); // Adjust the delay as needed
                // Adjust the delay as needed
            
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});
