
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}  ${hours}:${minutes}`;
}
function forecastDate(timestamp) {
  let date= new Date(timestamp * 1000);
  let day= date.getDay();
  let days= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];  
}

function displayForecast(response) {
  let forecast= response.data.daily;
  let forecastElement= document.querySelector("#forecast");

  let forecastHTML= `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6){
     forecastHTML=
     forecastHTML +
     `<div class="col-2">
          <div class="weather-forecast-date">
            ${forecastDate(forecastDay.dt)} 
          </div>
            <img 
             src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
             class="weather-forecast-icon" 
             alt="" 
             width="36"/>
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
        </div>
      </div>
      `;
    }  
  });
  forecastHTML= forecastHTML + `</div>`;
  forecastElement.innerHTML= forecastHTML;
}
function getForecast(coordinates) {
  let apiKey= "f449583012c431c47d4518085b0faa44";
  let apiUrl= 
   `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeatherInfo(response) {
  document.querySelector("#current-weather-temperature").innerHTML= Math.round(response.data.main.temp);
  document.querySelector("#searched-city").innerHTML= response.data.name;
  document.querySelector("#current-weather-info").innerHTML= response.data.weather[0].main;
  let dateElement= document.querySelector("#current-date");
  dateElement.innerHTML= formatDate(response.data.dt * 1000)
  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = `wind: ${wind}km/h`;
  let iconElement= document.querySelector("#current-weather-icon");
  iconElement.setAttribute("src", ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description); 

  getForecast(response.data.coord);
}
function searchCity(city) {
  let weatherApikey = "f449583012c431c47d4518085b0faa44";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApikey}&units=metric`;
  axios.get(weatherApiUrl).then(showWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityPosition = document.querySelector("#enter-city-form");
  let enteredCity = document.querySelector("#searched-city");
  enteredCity.innerHTML = `${cityPosition.value}`;
  let city = enteredCity.innerHTML;
  searchCity(city);
}

function searchLocation(position) {
  let latitude= position.coords.latitude;
  let longitude= position.coords.longitude;
  let weatherApikey= "f449583012c431c47d4518085b0faa44";
  let weatherApiUrl= 
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApikey}&units=metric`;
  axios.get(weatherApiUrl).then(showWeatherInfo);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchButton = document.querySelector("#searchcity-form");
searchButton.addEventListener("submit", handleSubmit);

let currentLocationButton= document.querySelector("#current-button");
currentLocationButton.addEventListener("click", currentLocation);

searchCity("Berlin");
