import getDate from './date';

const Weather = (() => {
  const key = '52016338d9f8fe348df731b7e220c063';
  const base = 'https://api.openweathermap.org/data/2.5/weather';
  let tempDet;

  const tempT = document.getElementById('temp');

  const kelvinToCelsius = (temp) => Math.round(temp - 273.15).toFixed(2);

  const kelvinToFahrenheit = (temp) => Math.round(((temp - 273.15) * (9 / 5)) + 32).toFixed(2);

  const tempSwitch = document.getElementById('tempCheckbox');

  const publishWeather = (cityname, country, temp, cloudDetails) => {
    const cityName = document.getElementById('city-name');
    cityName.textContent = `${cityname.toUpperCase()} , ${country}`;
    const dateDetails = document.getElementById('date-details');
    dateDetails.textContent = `${getDate.dateDetails()}`;
    if (tempSwitch.checked) {
      tempT.textContent = `Temp : ${kelvinToFahrenheit(temp)}°F`;
    } else {
      tempT.textContent = `Temp : ${kelvinToCelsius(temp)}°C`;
    }

    const cloud = document.getElementById('cloud');
    cloud.textContent = `${cloudDetails}`;
    if (cloudDetails === 'Haze') {
      document.body.style.background = "url('../../dist/assests/app-bg.jpeg') no-repeat";
      document.body.style.backgroundSize = 'cover';
    } else if (cloudDetails === 'Clear') {
      document.body.style.background = "url('../../dist/assests/sunny.jpeg') no-repeat";
      document.body.style.backgroundSize = 'cover';
    } else if (cloudDetails === 'Clouds') {
      document.body.style.background = "url('../../dist/assests/cloud.jpeg') no-repeat";
      document.body.style.backgroundSize = 'cover';
    } else {
      document.body.style.background = "url('../../dist/assests/app-bg.jpeg') no-repeat";
      document.body.style.backgroundSize = 'cover';
    }
  };

  const getWeather = async (city) => {
    await fetch(`${base}?q=${city}&appid=${key}`)
      .then((response) => response.json())
      .then((response) => {
        const cityName = response.name;
        const countryData = response.sys.country;
        const tempData = response.main.temp;
        const cloudData = response.weather[0].main;
        publishWeather(cityName, countryData, tempData, cloudData);
        tempDet = response.main.temp;
      })
      .catch(() => {
        alert('Please enter correct city name!!');
      });
  };

  const getCity = (e) => {
    e.preventDefault();
    let city = document.getElementById('city-search').value;
    if (city === '' || city === undefined || city === null) {
      city = 'Bangalore';
    } else {
      city = document.getElementById('city-search').value;
    }

    document.querySelector('form').reset();
    getWeather(city);
  };

  document.querySelector('form').addEventListener('submit', getCity);

  tempSwitch.addEventListener('change', () => {
    if (tempSwitch.checked) {
      setTimeout(() => {
        tempT.textContent = `Temp : ${kelvinToFahrenheit(tempDet)} °F`;
      }, 150);
    } else {
      setTimeout(() => {
        tempT.textContent = `Temp : ${kelvinToCelsius(tempDet)} °C`;
      }, 150);
    }
  });

  return { getCity, getWeather };
})();

export default Weather;