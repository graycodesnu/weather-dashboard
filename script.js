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

// TODO: Create button for stached cities 
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
  // Call getWeather for input
  getWeather(cityName);
  console.log(stachedCity);
  stachedCity.push(cityName);

  var newCityButton = document.createElement('button');
  newCityButton.setAttribute('class', 'cityName');
  newCityButton.textContent = cityName;
  $('stachedCity').append(newCityButton);

  // Local storage element
  localStorage.setItem('city', JSON.stringify(stachedCity));
  weatherEventListener();
});

// TODO: Create date function for forecast
let dateFunc = function (time) {
  let realDate = new Date();
  realDate.setTeim(time * 1000);
  let day = realDate.getDate();
  let month = realDate.getMonth() + 1;
  let year = realDate.getFullYear();
  return month + '/' + day + '/' + year;
}

// TODO: Create container with city, date, temp, wind, humidity, UV index
// Use getCity for location info
var getCity = function (lat, lon) {
  let conditionsAPI = 
  // insert API call URL
    // ? API docs show Kelvin. Not sure how to convert to Farenheit, MPH, etc
    // ** API doc FAQ shows input would = 'units = imperial' in url 
    'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=6728d2e288b13f55b4c218555ab74c19' + '&units=imperial'

    // Fetch for conditionsAPI
    fetch(conditionsAPI)
      .then(function (response) {
        return response.json();
      }) .then(function(data) {
      
        // Current weather
        $('.cityDate').html(cityName + ' (' + dateFunc(data.current.dt) +')' + `<img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" />`);
      
        // Temp
        $('.temp').text('Temp: ' + data.current.temp + 'f');
      
        // Wind
        $('.wind').text('Wind: ' + data.current.wind_speed + 'MPH')

        // Humidity
        $('.humidity').text('Humidity' + data.current.humidity + '%')
      
        // UV
        $('uvIndex').html('UV Index: ' + data.current.uvi);
        // ? TODO: UV color indicator??

      })

}

// TODO: five-day forecast call
var fiveDayForecast = function (data) {
  $('.fiveDayForecast').empty()
  // Five-day for loop
  for (let i = 1; i < 6; i++) {
    // Define days and create container + class
    var days = $("<div class = 'days'></div>")
    $(days).append(dateFunc(data.daily[i].dt));
    $(days).append(`<img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>`);
    // Temp
    $(days).append
    // Wind
    $(days).append
    // Humidity
    $(days).append
    $(days).append
  }

}

// TODO: Container for five-day forecast