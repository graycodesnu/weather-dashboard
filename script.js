// location variable, for loop with added city button
let cityName;

// City from local storage
let stachedCity = JSON.parse(localStorage.getItem('City')) || [];

for (let i = 0; i < stachedCity.length; i++) {
  // Added city button
 var addCityButton = document.createElement('button');
 addCityButton.setAttribute('class', 'cityNames');
 addCityButton.textContent = stachedCity[i];
 console.log(stachedCity[i]);
 $('#stachedCities').append(addCityButton);
 weatherEventListener();
}

// fetch API 
  // API key: 6728d2e288b13f55b4c218555ab74c19
var getWeather = function (cityName) {
  let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=6728d2e288b13f55b4c218555ab74c19`;
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.cod !== '200') {
        console.log('Error fetching city.');
        return;
      }
    getCity(data.city.coord.lat, data.city.coord.lon);
    })
    .catch(err => console.log(err));
};

// Create button for stached cities 
function weatherEventListener() {
  var stachedCityButton = document.querySelectorAll('.cityNames');
  stachedCityButton.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      cityName = e.target.innertext;
      getWeather(cityName);
    });
  });
}

// Create search button
var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
    cityName = $("#cityInput").val();
    // Call getWeather for input
    getWeather(cityName);
    console.log(stachedCity);
    stachedCity.push(cityName);

    var newCityButton = document.createElement('button');
    newCityButton.setAttribute('class', 'cityNames');
    newCityButton.textContent = cityName;
    $('#stachedCities').append(newCityButton);

    // Local storage element
    localStorage.setItem('City', JSON.stringify(stachedCity));
    weatherEventListener();
  });

// Create date function for forecast
let dateFunc = function (time) {
  let realDate = new Date();
  realDate.setTime(time * 1000);
  let day = realDate.getDate();
  let month = realDate.getMonth() + 1;
  let year = realDate.getFullYear();
  return month + '/' + day + '/' + year;
}

// Create container with city, date, temp, wind, humidity, UV index
// Use getCity for location info
var getCity = function (lat, lon) {
  let conditionsAPI = 
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6728d2e288b13f55b4c218555ab74c19&units=imperial`

    // Fetch for conditionsAPI
    fetch(conditionsAPI)
      .then(function (response) {
        return response.json();
      }) .then(function(data) {
      
        // Current weather
        $('.cityDate').html(`<h3>${cityName}</h3>` + `<img src='https://openweathermap.org/img/w/${data.current.weather[0].icon}.png' />`);
      
        // Temp
        $('.temp').text(data.current.temp + ' ℉')

        // Wind
        $('.wind').text(data.current.wind_speed + ' MPH')

        // Humidity
        $('.humidity').text(data.current.humidity + '%')
      
        // UV
        $('.uvIndex').html(`<span class="btnColor">${data.current.uvi}</span`);

        // Forecast Data
        fiveDayForecast(data);

        // UV color indicator
        // <= 2
        if (data.current.uvi <= 2) {
          console.log('favorable!')
          $('.btnColor').attr('class', 'btn btn-success');
        };

        // > 2, <= 5
        if (data.current.uvi > 2 && data.current.uvi <= 5) {
          console.log('moderate!')
          $('.btnColor').attr('class', 'btn btn-warning');
        };

        // > 5
        if (data.current.uvi > 5) {
          console.log('severe!')
          $('.btnColor').attr('class', 'btn btn-danger');
        };

      });

};

// Create five-day forecast container + call 
var fiveDayForecast = function (data) {
  $('.fiveDayForecast').empty();
  // Five-day for loop
  for (let i = 1; i < 6; i++) {

    // Define days and create container + class
    var days = $("<div class = 'days card'><div />")

    // Call date
    $(days).append(dateFunc(data.daily[i].dt));
    $(days).append(`<img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>`);
    
    // Temp
    $(days).append(`<p>Temp: ${data.daily[i].temp.day} ℉</p>`);
    
    // Wind
    $(days).append(`<p>Wind: ${data.daily[i].wind_speed} MPH</p>`);
    
    // Humidity
    $(days).append(`<p>Humidity: ${data.daily[i].humidity}%</p>`);

    $('.fiveDayForecast').append(days)
  };
}
