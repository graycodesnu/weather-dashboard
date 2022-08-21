// TODO: location variable, for loop with added city button
let cityName;

// City from local storage
let stachedCity = JSON.parse(localStorage.getItem('city')) || [];

for (let = 0; i < stachedCity.length i++) {
  // Added city button
 var addCityButton = document.createElement('button');
 addCityButton.setAttribute('class', 'cityName');
 addCityButton.textContent = stachedCity[i];
 console.log(storedCity[i]);
 $('#presetCities').append(addCityButton);
 addWeatherEventListener();
}

// TODO: fetch API 
  // API key: 6728d2e288b13f55b4c218555ab74c19

// TODO: Create button for preset cities 

// TODO: Create search button

// TODO: Create function

// TODO: Create container with city, date, temp, wind, humidity, UV index

// TODO: Create 5-day forecast container