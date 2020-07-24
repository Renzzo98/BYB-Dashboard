fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
      var randQuote = Math.floor((Math.random() * 1642)+ 0)
      //console.log(data[randQuote]);
      document.getElementById("InsQuote").innerHTML = data[randQuote].text;
});


import { apiKey } from '../../config/key.js';
let zipCode = '11501';
let CC = 'us';
let url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',' + CC + '&appid=' + apiKey;


fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
      let temp = data.main.feels_like;
      updateTempVal(temp);
      let weatherCond = data.weather[0].main;
      let icon = data.weather[0].icon;
      determineWeatherIcon(weatherCond, icon);
      animatedIcon(CurWeather, weatherColor);
      
});

let CurWeather = "";
let weatherColor = "";

window.addEventListener("load", function(){
    //animatedIcon(CurWeather);
});

function updateTempVal(kelvin){
    var temp = parseInt(kelvin);
    var celsius = temp - 273.15;
    celsius = Math.trunc(celsius);
    var fahrenheit = Math.round(celsius + 33.8);
    var cel_value = celsius.toString() + " C";
    var fah_value = fahrenheit.toString() + " F";
    //console.log("TEMP: " + result)
    var final_val = cel_value + " | " + fah_value;
    document.getElementById("tempVal").innerHTML = final_val;
}



function determineWeatherIcon(cond, icon){
    switch (icon){
        case "01d":
            weatherColor = "GOLD";
            CurWeather = "clear-day";
            break;
        case "01n":
            weatherColor = "MIDNIGHTBLUE";
            CurWeather = "clear-night";
            break;
        case "02d":
            weatherColor = "MOCCASIN";
            CurWeather = "partly-cloudy-day";
            break;
        case "03d":
            weatherColor = "MOCCASIN";
            CurWeather = "partly-cloudy-day";
            break;
        case "04d":
            weatherColor = "MOCCASIN";
            CurWeather = "partly-cloudy-day";
            break;
        case "02n":
            weatherColor = "REBECCAPURPLE";
            CurWeather = "partly-cloudy-night";
            break;
        case "03n":
            weatherColor = "REBECCAPURPLE";
            CurWeather = "partly-cloudy-night";
            break;
        case "04n":
            weatherColor = "REBECCAPURPLE";
            CurWeather = "partly-cloudy-night";
            break;
    }   
    switch(cond){
        case "Rain":
            weatherColor = "SLATEBLUE";
            CurWeather = "rain";
            break;
        case "Thunderstorm":
            weatherColor = "PERU";
            CurWeather = "cloudy";
            break;
        case "Drizzle":
            weatherColor = "SKYBLUE";
            CurWeather = "sleet";
            break;
        case "Snow":
            weatherColor = "SNOW";
            CurWeather = "snow";
            break;
        case "Wind":
            weatherColor = "LAVENDER";
            CurWeather = "wind";
            break;
        case "Fog":
            weatherColor = "LAVENDER";
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
