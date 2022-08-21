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
 weatherEventListener();
}

// TODO: fetch API 
  // API key: 6728d2e288b13f55b4c218555ab74c19
var getWeather = function (cityName) {
  let api = 'https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=6728d2e288b13f55b4c218555ab74c19"'
  fetch(api)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    getCity(data.city.coord.lat, data.city.coord.lon)
    console.log(getCity())
    })
};

// TODO: Create button for preset cities 
function weatherEventListener() {
  var stachedCityButton = document.querySelectorAll('.cityName');
  stachedCityButton.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      cityName = e.target.innertext;
      getWeather(cityName);
    });
  });
}

// TODO: Create search button
var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function () {
  cityName = $('#cityInput').value();
  getWeather(cityName);
  console.log(stachedCity);
  stachedCity.push(cityName);

  var newCityButton = document.createElement('button');
  newCityButton.setAttribute('class', 'cityNames');
  newCityButton.textContent = cityName;
  $('stachedCity').append(newCityButton);

  // Local storage element
  localStorage.setItem('city', JSON.stringify(stachedCity));
  weatherEventListener();

});


// TODO: Create function

// TODO: Create container with city, date, temp, wind, humidity, UV index

// TODO: Create 5-day forecast container