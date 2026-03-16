// Bible verses for daily inspiration
const bibleVerses = [
  "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope. - Jeremiah 29:11",
  "Trust in the Lord with all your heart and lean not on your own understanding. - Proverbs 3:5",
  "I can do all things through Christ who strengthens me. - Philippians 4:13",
  "The Lord is my shepherd; I shall not want. - Psalm 23:1",
  "Come to me, all you who are weary and burdened, and I will give you rest. - Matthew 11:28",
  "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. - Philippians 4:6",
  "For God so loved the world that he gave his one and only Son. - John 3:16",
  "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you. - Deuteronomy 31:6",
  "What, then, shall we say in response to these things? If God is for us, who can be against us? - Romans 8:31",
  "Therefore do not worry about tomorrow, for tomorrow will worry about itself. - Matthew 6:34",
  "Blessed is the one who trusts in the Lord, whose confidence is in him. - Jeremiah 17:7",
  "The Lord hears his people when they call to him for help. - Psalm 34:17",
  "Peace I leave with you; my peace I give you. I do not give to you as the world gives. - John 14:27",
  "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you. - Matthew 7:7",
  "Let all that you do be done in love. - 1 Corinthians 16:14",
  "Rejoice in the Lord always. I will say it again: Rejoice! - Philippians 4:4",
  "Love the Lord your God with all your heart and with all your soul and with all your mind. - Matthew 22:37",
  "For the Lord will not cast off his people, nor will he forsake his inheritance. - Psalm 94:14",
  "I have told you all this, so that you may have peace in me. Here on earth you will have many trials and sorrows. But take heart, because I have overcome the world. - John 16:33",
  "Casting all your anxieties on him, because he cares for you. - 1 Peter 5:7"
];

function displayRandomBibleVerse() {
  const randomIndex = Math.floor(Math.random() * bibleVerses.length);
  document.getElementById("InsQuote").innerHTML = bibleVerses[randomIndex];
}

displayRandomBibleVerse();

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
