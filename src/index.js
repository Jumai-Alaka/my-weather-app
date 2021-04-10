
function formatDate(timestamp) {
  let date= new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[timestamp.getDay()];
  let hours = timestamp.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = timestamp.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}  ${hours}:${minutes}`;
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

function tempCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector(
    "#current-weather-temperature"
  );
  let temperature = currentTemperature.innerHTML;
  temperature = Number(temperature);
  currentTemperature.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

function tempFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector(
    "#current-weather-temperature"
  );
  let temperature = currentTemperature.innerHTML;
  temperature = Number(temperature);
  currentTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let searchButton = document.querySelector("#searchcity-form");
searchButton.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", tempCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", tempFahrenheit);

let currentLocationButton= document.querySelector("#current-button");
currentLocationButton.addEventListener("click", currentLocation);

searchCity("Berlin");