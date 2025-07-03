// Import the 'cities' module which provides city data based on ZIP codes
const cities = require("cities");

// Use the 'zip_lookup' function to find city information for ZIP code 00687
var myCity = cities.zip_lookup("00687");

// Log the city information to the console
console.log(myCity);