fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
      var randQuote = Math.floor((Math.random() * 1642)+ 0)
      //console.log(data[randQuote]);
      document.getElementById("InsQuote").innerHTML = data[randQuote].text;
});

let apiKey = '516803d00f5ca53e18bb0b65b8cb451a';
let zipCode = '11501'
let CC = 'us'
let url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',' + CC + '&appid=' + apiKey;


fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
      console.log(data);
      let temp = data.main.feels_like;
      temp = convertToCelsius(temp);
      changeTempText(temp);
      let weatherCond = data.weather[0].main;
      let icon = data.weather[0].icon;
      console.log("Cond: " + weatherCond);
      determineWeatherIcon(weatherCond, icon);
      animatedIcon(CurWeather);
      
});

let CurWeather = "";


window.addEventListener("load", function(){
    //animatedIcon(CurWeather);
});

function convertToCelsius(kelvin){
    var temp = parseInt(kelvin);
    var celsius = temp - 273.15;
    celsius = Math.trunc(celsius);
    var result = celsius.toString() + " C";
    //console.log("TEMP: " + result)
    return result;
}

function changeTempText(tempVal){
    document.getElementById("tempVal").innerHTML = tempVal;
}

function determineWeatherIcon(cond, icon){
    console.log("HIT");
    switch (icon){
        case "01d":
            CurWeather = "clear-day";
            break;
        case "01n":
            CurWeather = "clear-night";
            break;
        case "02d":
            CurWeather = "partly-cloudy-day";
            break;
        case "03d":
            CurWeather = "partly-cloudy-day";
            break;
        case "04d":
            CurWeather = "partly-cloudy-day";
            break;
        case "02n":
            CurWeather = "partly-cloudy-night";
            break;
        case "03n":
            CurWeather = "partly-cloudy-night";
            break;
        case "04n":
            CurWeather = "partly-cloudy-night";
            break;
    }   
    switch(cond){
        case "Rain":
            CurWeather = "rain";
            break;
        case "Thunderstorm":
            CurWeather = "cloudy";
            break;
        case "Drizzle":
            CurWeather = "sleet";
            break;
        case "Snow":
            CurWeather = "snow";
            break;
        case "Wind":
            CurWeather = "wind";
            break;
        case "Fog":
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


function animatedIcon(weatherCond){
    var skycons = new Skycons({"color": "pink"});
    // on Android, a nasty hack is needed: {"resizeClear": true}

    // you can add a canvas by it's ID...
    console.log("CUR WEATHER: " + weatherCond);
    skycons.add("icon1", weatherCond);

    // if you're using the Forecast API, you can also supply
    // strings: "partly-cloudy-day" or "rain".

    // start animation!
    skycons.play();

    
}
