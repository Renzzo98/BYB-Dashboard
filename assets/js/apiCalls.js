
fetch('/api/weather')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
      console.log("Weather data:", data);
      let temp = data.main.feels_like;
      updateTempVal(temp);
      let weatherCond = data.weather[0].main;
      let icon = data.weather[0].icon;
      console.log("Weather condition:", weatherCond, "Icon:", icon);
      determineWeatherIcon(weatherCond, icon);
      console.log("Skycons type:", CurWeather, "Color:", weatherColor);
      animatedIcon(CurWeather, weatherColor);
  })
  .catch(function(error) {
      console.error("Error fetching weather:", error);
  });

let CurWeather = "";
let weatherColor = "";
let currentTempCelsius = 0;
let currentTempFahrenheit = 0;
let showingFahrenheit = true;

window.addEventListener("load", function(){
    //animatedIcon(CurWeather);
    const tempElement = document.getElementById("tempVal");
    if(tempElement) {
        tempElement.style.cursor = "pointer";
        tempElement.addEventListener("click", toggleTemperatureUnit);
    }
});

function updateTempVal(kelvin){
    var temp = parseInt(kelvin);
    currentTempCelsius = Math.trunc(temp - 273.15);
    currentTempFahrenheit = Math.round(currentTempCelsius + 33.8);

    showingFahrenheit = true;
    displayTemperature();
}

function displayTemperature(){
    const tempElement = document.getElementById("tempVal");
    if(showingFahrenheit) {
        tempElement.innerHTML = currentTempFahrenheit + "°F";
    } else {
        tempElement.innerHTML = currentTempCelsius + "°C";
    }
}

function toggleTemperatureUnit(){
    const tempElement = document.getElementById("tempVal");
    tempElement.classList.add("toggling");

    setTimeout(() => {
        showingFahrenheit = !showingFahrenheit;
        displayTemperature();
    }, 200);

    setTimeout(() => {
        tempElement.classList.remove("toggling");
    }, 400);
}



function determineWeatherIcon(cond, icon){
    const metalGray = "#8a8a8a";

    switch (icon){
        case "01d":
            weatherColor = metalGray;
            CurWeather = "clear-day";
            break;
        case "01n":
            weatherColor = metalGray;
            CurWeather = "clear-night";
            break;
        case "02d":
            weatherColor = metalGray;
            CurWeather = "partly-cloudy-day";
            break;
        case "03d":
            weatherColor = metalGray;
            CurWeather = "partly-cloudy-day";
            break;
        case "04d":
            weatherColor = metalGray;
            CurWeather = "partly-cloudy-day";
            break;
        case "02n":
            weatherColor = metalGray;
            CurWeather = "partly-cloudy-night";
            break;
        case "03n":
            weatherColor = metalGray;
            CurWeather = "partly-cloudy-night";
            break;
        case "04n":
            weatherColor = metalGray;
            CurWeather = "partly-cloudy-night";
            break;
    }
    switch(cond){
        case "Rain":
            weatherColor = metalGray;
            CurWeather = "rain";
            break;
        case "Thunderstorm":
            weatherColor = metalGray;
            CurWeather = "cloudy";
            break;
        case "Drizzle":
            weatherColor = metalGray;
            CurWeather = "sleet";
            break;
        case "Snow":
            weatherColor = metalGray;
            CurWeather = "snow";
            break;
        case "Wind":
            weatherColor = metalGray;
            CurWeather = "wind";
            break;
        case "Fog":
            weatherColor = metalGray;
            CurWeather = "fog";
            break;
    }
}

function formatIconURL(initIcon){
    //let icon = data.weather[0].icon;
    //console.log("icon: " + icon.toString());
    //let iconURL = formatIconURL(icon);
    //document.getElementById("weatherCondImg").src = iconURL;
    url = 'http://openweathermap.org/img/wn/';
    url = url + initIcon + '@2x.png';
    return url;
}


function animatedIcon(weatherCond, weatherColor){
    var skycons = new Skycons({"color": weatherColor});
    // on Android, a nasty hack is needed: {"resizeClear": true}

    // you can add a canvas by it's ID...
    skycons.add("icon1", weatherCond);

    // if you're using the Forecast API, you can also supply
    // strings: "partly-cloudy-day" or "rain".

    // start animation!
    skycons.play();

    
}
