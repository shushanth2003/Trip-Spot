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
    const destinationDropdown = document.getElementById('destination_holidaypackage');
    data.holidaypackage.forEach(holidaypackage => {
        const opt1 = `<option value="${holidaypackage.vacation_name}">${holidaypackage.vacation_name}</option>`;
        destinationDropdown.innerHTML += opt1;
    });
}

// Call fetchhotelData to fetch and process data
fetchholidaypackage(); 
document.addEventListener('DOMContentLoaded', function() {
    const holidaypackagesbutton = document.getElementById("holidaypackages");
    
    if (holidaypackagesbutton) {
        holidaypackagesbutton.addEventListener("click", function(event) {
            event.preventDefault();
            
            const destinations_holidaypackages = document.getElementById("destination_holidaypackage").value;
            const startDate_holidaypackages = document.getElementById("startDate_holidaypackage").value;
            const endDate_holidaypackages = document.getElementById("endDate_holidaypackage").value;
            const guests_holidaypackages = document.getElementById("guests_holidaypackage").value;
            const packageType_holidaypackages = document.getElementById("packageType_holidaypackage").value;
            const budget_holidaypackages = document.getElementById("budget_holidaypackage").value;


            const holidaypackagebooking = {
                user_destination_holidaypackage: destinations_holidaypackages,
                user_startDate_holidaypackage: startDate_holidaypackages,
                user_endDate_holidaypackage: endDate_holidaypackages,
                user_guests_holidaypackage: guests_holidaypackages,
                user_packageType_holidaypackage: packageType_holidaypackages,
                user_budget_holidaypackage: budget_holidaypackages
            };
            let hasError=false;
            if (!holidaypackagebooking.user_destination_holidaypackage.trim() || 
                !holidaypackagebooking.user_startDate_holidaypackage.trim() || 
                !holidaypackagebooking.user_endDate_holidaypackage.trim() || 
                !holidaypackagebooking.user_guests_holidaypackage.trim() || 
                !holidaypackagebooking.user_packageType_holidaypackage.trim() ||
                !holidaypackagebooking.user_budget_holidaypackage) {
                    document.getElementById('destination_holidaypackage_error').innerHTML = "Please select the destination.";
                    document.getElementById('startDate_holidaypackage_error').innerHTML = "Please select the Start Date.";
                    document.getElementById('endDate_holidaypackage_error').innerHTML = "Please select the End Date.";
                    document.getElementById('guests_holidaypackage_error').innerHTML = "Please select the Guest Date.";
                    document.getElementById('packageType_holidaypackage_error').innerHTML = "Please select the Property Date.";
                    document.getElementById('budget_holidaypackage_error').innerHTML = "Please select the Budget.";
                    
                    document.getElementById('destination_holidaypackage_error').style.color = "red";
                    document.getElementById('startDate_holidaypackage_error').style.color = "red";
                    document.getElementById('endDate_holidaypackage_error').style.color = "red";
                    document.getElementById('packageType_holidaypackage_error').style.color = "red";
                    document.getElementById('budget_holidaypackage_error').style.color = "red"; // Fixed this line
                    document.getElementById('guests_holidaypackage_error').style.color = "red";
                    
                    hasError = true;
                    

                if(hasError){
                    return;
                }
            }
            fetch('http://localhost:3000/submit-holidaypackage-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(holidaypackagebooking)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('data', data);
                var toastLiveExample = document.getElementById('liveToast');
                var toast = new bootstrap.Toast(toastLiveExample);
                toast.show();
                setTimeout(()=>{
                    const paramString = new URLSearchParams(holidaypackagebooking).toString(); 

                    window.location.href=`./bookingpage/holidays.html?${paramString}`
                },1000)
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});
