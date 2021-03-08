import getDate from './date';

const Weather = (() => {

  const key = `52016338d9f8fe348df731b7e220c063`;
  const base = `https://api.openweathermap.org/data/2.5/weather`;

  const btn = document.getElementById('search-btn');
  let tempDet;
  const getCity = (e) => {
    e.preventDefault();
    let city = document.getElementById('city-search').value;
    if(city === '' || city === undefined || city === null) {
      city = 'Bangalore';
    }else {
      city = document.getElementById('city-search').value;
    }

    document.querySelector('form').reset();
    getWeather(city);
  };

  document.querySelector('form').addEventListener('submit',getCity);
  

  const getWeather = async function(city) {
    await fetch(`${base}?q=${city}&appid=${key}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      publishWeather(response.name,response.sys.country,response.main.temp,response.weather[0].main);
      tempDet = response.main.temp;
    })


  }

  const tempT = document.getElementById("temp");

  const publishWeather = (cityname,country, temp, cloudDetails) => {
    const resultContainer = document.getElementById("weather-details");
    const cityName = document.getElementById("city-name");
    cityName.textContent = `${cityname.toUpperCase()} , ${country}`;
    const dateDetails = document.getElementById("date-details");
    dateDetails.textContent = `${getDate.dateDetails()}`;
    tempT.textContent = `Temp : ${kelvinToCelsius(temp)}°C`;
    const cloud = document.getElementById("cloud");
    cloud.textContent = `${cloudDetails}`;
  };

  const kelvinToCelsius = (temp) => {
    return Math.round(temp - 273.15).toFixed(2);
  }

  const kelvinToFahrenheit = (temp) => {
   
    return Math.round(((temp-273.15)*9/5)+32).toFixed(2);
  }

  const tempSwitch = document.getElementById('tempCheckbox');

  tempSwitch.addEventListener('change', () => {
    if(tempSwitch.checked) {
      setTimeout(() => {
        tempT.textContent= `Temp : ${kelvinToFahrenheit(tempDet)} °F`;
      }, 150)
    }else {
        setTimeout(() => {
          tempT.textContent = `Temp : ${kelvinToCelsius(tempDet)} °C`;
        },150)
    }
  });

    return {getCity, getWeather}

})();

export default Weather;