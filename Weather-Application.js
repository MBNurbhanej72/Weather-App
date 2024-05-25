let cityName = document.querySelector(".weather-city");
let dateTime = document.querySelector(".weather-date-time");
let w_forecast = document.querySelector(".weather-forecast");
let w_icon = document.querySelector(".weather-icon");
let w_temperature = document.querySelector(".weather-temperature");
let w_minTem = document.querySelector(".weather-min");
let w_maxTem = document.querySelector(".weather-max");

let w_feelsLike = document.querySelector(".weather-feelsLike");
let w_humidity = document.querySelector(".weather-humidity");
let w_wind = document.querySelector(".weather-wind");
let w_pressure = document.querySelector(".weather-pressure");

let citySearch = document.querySelector(".weather-search");

const getCountryName = (code) => {
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
}

const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(curDate);
}

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityNameInput = document.querySelector(".city-name");
  city = cityNameInput.value;

  getWeatherData();

  cityNameInput.value = "";
});

let city = "ahmedabad";

let getWeatherData = async () => {
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=cacd83eadf3ea9fe2a453e825d33c1ec`;
  try {
    let res = await fetch(weatherUrl);
    let data = await res.json();
    let { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    // Convert temperatures from Kelvin to Celsius
    w_temperature.innerHTML = `${(main.temp - 273.15).toFixed(2)}&#176;C`;
    w_minTem.innerHTML = `Min: ${(main.temp_min - 273.15).toFixed()}&#176;C`;
    w_maxTem.innerHTML = `Max: ${(main.temp_max - 273.15).toFixed()}&#176;C`;

    w_feelsLike.innerHTML = ` ${(main.feels_like - 273.15).toFixed(2)}&#176;C`;
    w_humidity.innerHTML = ` ${main.humidity}%`;
    w_wind.innerHTML = ` ${wind.speed} m/s`;
    w_pressure.innerHTML = ` ${main.pressure} hPa`;

  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getWeatherData);
