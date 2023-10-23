/*
    Assignment #4
    {Patricia Bialek}
*/

$(function () {
    //if/else statement to get users permission and if browser supports
    if(navigator.geolocation)
    {
        console.log('is supported');
        //Success and Blocked arguments if user denies or accepts access for geolocation
        navigator.geolocation.getCurrentPosition(Success, Blocked)
    } 
    else 
    {
        console.log('is not supported');
    }

    //User allows location
    function Success(position){
        //get coordinates of location
        const lat1 = position.coords.latitude;
        const lon1 = position.coords.longitude;
        //current location
        let cLocation = `Latitude: ${lat1}, Longitude: ${lon1}`;
        
        //output location
        $('#locationhere').text(`Current location: ${cLocation}`);

        //check to see if a location value is already stored in localstorage
        //pLocation checks if your previous location has been stored
        const pLocation = localStorage.getItem('previousLocation');

        if(pLocation)
        {
            //if it exists in local storage =
            //out the previous location in a new div element
            //create a new div
            let newDiv = $('<div></div>');

            //set the id
            newDiv.attr('id', 'locationValue');
            //output the previous location
            newDiv.text(`Previous location: ${pLocation}`);
            //insert the newDiv after the id(locationhere)
            $("#locationhere").after(newDiv);

            //Welcome back message 
            let h1 = $('<h1></h1>');
            h1.attr('id','welcomeMessage');
            h1.text('Welcome Back!');
            $("#locationValue").after(h1);

            //distance travelled since last visit
            let lat2 = parseFloat(pLocation.split(": ")[1]);
            let lon2 = parseFloat(pLocation.split(": ")[2]);
            //takes current and previous location - lon and lat
            const distanceTraveled = calcDistanceBetweenPoints(lat1, lon1, lat2, lon2);

            //testing
            console.log(pLocation);
            if (!isNaN(lon2)) {
            console.log(lat2);
            console.log(lon2);
            }

            //output distance travelled
            let distance = $('<p></p>');
            h1.attr('id','distanceTravelled');
            h1.text(`You have travelled ${distanceTraveled} meters since your last visit`);
            $("#welcomeMessage").after(distance);
        }
        else 
        {
            //if it does not exist
            //display welcome message
            let h1 = $('<h1></h1>');
            h1.attr('id','welcomeMessage');
            h1.text('Welcome to the page!');
            $("#locationhere").after(h1);
        }
        //sets a key-value pair in the local storage
        //PL: is the key, you'll retreived it later
        //CL: is the value you are storing
        localStorage.setItem('previousLocation', cLocation);
    }

    //User denies access
    function Blocked() {
        $('#locationhere').text('Error: must use geolocation to continue!');
    }
    
    //     // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    //     // function to calculate the distance in metres between two lat/long pairs on Earth
    //     // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    //     // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
        return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    } 
});
