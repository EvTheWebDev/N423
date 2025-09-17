export function getWeather(location) {
  let weatherURL = `https://api.weatherapi.com/v1/current.json?key=3f492440322745beb71150446251509&q=${location}&aqi=no
`;
  console.log("Grabbing Weather Data");

  // because it is an array, you need to get the first item in the array to access data.

  $.getJSON(weatherURL, (data) => {
    console.log(data);
    let weather = data.current.condition.text;
    let tempString = data.current.temp_f + `°F <span class="celsius">(${data.current.temp_c}°C)</span> 
    <span class="feelsLike">Feels Like: ` + data.current.feelslike_f + `°F <span class="celsius">(${data.current.feelslike_c}°C)</span></span>`;
    let lat = data.location.lat;
    let lon = data.location.lon;
    let city = data.location.name;
    let state = data.location.region;
    let locationString = city + ", " + state;
    let country = data.location.country;
    let iconURL = `https:${data.current.condition.icon}`;

    // Changing site Favicon
    let favicon = document.getElementById("favicon");
    favicon.href = iconURL;

    let weatherHolder = document.querySelector(`.weatherHolder`);
    
    $(weatherHolder).html(`
      <h4 class="latLon">(${lat} , ${lon})</h4>
      <h2>${locationString}, <span>(${country})</span></h2>
      <img class="icon" src="${iconURL}" alt="${weather} icon">
      <h3>${weather}</h3>
      <h3>${tempString}</h3>

    `);
  });
}

export function getForecast(location, days) {
  let forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=3f492440322745beb71150446251509&q=${location}&days=${days}&aqi=no&alerts=no
`;
  console.log("Grabbing Forecast Data");

  $.getJSON(forecastURL, (data) => {
    console.log(data);
    let city = data.location.name;
    let state = data.location.region;
    let country = data.location.country;
    let locationString = city + ", " + state;
    let forecastDays = data.forecast.forecastday;

    let forecastHolder = document.querySelector(`.forecastHolder`);
    $(forecastHolder).html(`
      <h2 class="forecastTitle">${days} day forecast for ${locationString}, <span>(${country})</span></h2>
    `);

    forecastDays.forEach((day) => {
      let date = day.date;
      let iconURL = `https:${day.day.condition.icon}`;
      let condition = day.day.condition.text;
      let maxTemp = day.day.maxtemp_f + `°F <span class="celsius">(${day.day.maxtemp_c}°C)</span>`;
      let minTemp = day.day.mintemp_f + `°F <span class="celsius">(${day.day.mintemp_c}°C)</span>`;
      let avgTemp = day.day.avgtemp_f + `°F <span class="celsius">(${day.day.avgtemp_c}°C)</span>`;
      let maxWind = day.day.maxwind_mph + ` mph <span class="kph">(${day.day.maxwind_kph} kph)</span>`;
      let totalPrecip = day.day.totalprecip_in + ` in <span class="mm">(${day.day.totalprecip_mm} mm)</span>`;
      let avgHumidity = day.day.avghumidity + `%`;

      $(forecastHolder).append(`
        <div class="forecastDay">
          <h3>${date}</h3>
          <img class="icon" src="${iconURL}" alt="${condition} icon">
          <h4>${condition}</h4>
          <p><span class="label">Max Temp:</span> ${maxTemp}</p>
          <p><span class="label">Min Temp:</span> ${minTemp}</p>
          <p><span class="label">Avg Temp:</span> ${avgTemp}</p>
          <p><span class="label">Max Wind:</span> ${maxWind}</p>
          <p><span class="label">Total Precip:</span> ${totalPrecip}</p>
          <p><span class="label">Avg Humidity:</span> ${avgHumidity}</p>
        </div>
      `);
    });
  });
}