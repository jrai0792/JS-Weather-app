
const Weather = (() => {

  const key = `52016338d9f8fe348df731b7e220c063`;
  const base = `https://api.openweathermap.org/data/2.5/weather`;

  // let city = document.getElementById('city-search').value;
  const btn = document.getElementById('search-btn');
  const getCity = (e) => {
    e.preventDefault();
    let city = document.getElementById('city-search').value;
    if(city === '' || city === undefined || city === null) {
      city = 'Bangalore';
    }else {
      city = document.getElementById('city-search').value;
    }

    console.log(city);

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
      // console.log(response, response.name, response.main.temp, response.main.temp_min, response.main.temp_max, response.sys.country);
      publishWeather(response.name,response.sys.country,response.main.temp);
    })


  }

  const publishWeather = (cityname,country, temp) => {
    const resultContainer = document.getElementById("weather-details");
    const cityName = document.getElementById("city-name");
    cityName.textContent = `${cityname.toUpperCase()} , ${country}`;
    const tempT = document.getElementById("temp");
    tempT.textContent = `Temp : ${temp}`;
    resultContainer.appendChild(cityName);
    resultContainer.appendChild(tempT);

  };

    return {getCity, getWeather}

})();

export default Weather;