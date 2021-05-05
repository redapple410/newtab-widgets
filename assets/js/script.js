"use strict";

document.addEventListener("DOMContentLoaded", () => {
  getWeather().then(showWeather);

  let currentTime = Math.round(new Date().getTime() / 1000);;

  // update word of the day every 12 hours
  if(currentTime - localStorage.getItem("wordTime") >= 12 * 60 * 60){
    getWord()
      .then(wordJson => {
        localStorage.setItem("wordOfTheDay", wordJson[0].meta.id);
        localStorage.setItem("wordType", wordJson[0].fl);
        localStorage.setItem("wordDefinitions", JSON.stringify(wordJson[0].shortdef));
        showWord();
      })
      .then(() => localStorage.setItem("wordTime", currentTime));
  }
  else{
    showWord();
  }

  // update number trivia every 24 hours
  if(currentTime - localStorage.getItem("numberTriviaTime") >= 24 * 60 * 60){
    getNumberTrivia()
      .then((numberTriviaText) => {
        localStorage.setItem("numberTriviaText", numberTriviaText);
        showNumberTrivia();
      })
      .then(() => localStorage.setItem("numberTriviaTime", currentTime));
  }
  else{
    showNumberTrivia();
  }
});


async function getWeather(){
  // get location based on IP address
  return fetch("http://ipinfo.io/json")
    .then(response => response.json())
    .then(result => {
      let location = `${result.city},${result.country}`;
      // get current weather for this location
      return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${WEATHER_KEY}`);
    })
    .then(response => response.json());
}

function showWeather(weatherJson){
  document.getElementById("weatherIcon")
    .setAttribute("src", "http://openweathermap.org/img/wn/" + weatherJson.weather[0].icon + "@2x.png");
  document.getElementById("weatherLocation").innerText = `${weatherJson.name}, ${weatherJson.sys.country}`;
  document.getElementById("weatherTemperature").innerText = `${Math.round(weatherJson.main.temp)}\u00B0C`;
  document.getElementById("weatherFeelsLike").innerText = `Feels like ${Math.round(weatherJson.main.feels_like)}\u00B0C`;
  document.getElementById("weatherDescription").innerText = capitalizeFirstLetter(weatherJson.weather[0].description);
  document.getElementById("weatherWindAndSun").innerText =
    `${Math.round(weatherJson.wind.speed * 3.6)} km/h ${convertDegreesToDirection(weatherJson.wind.deg)} || ` +
    `${convertTime(weatherJson.sys.sunrise, weatherJson.timezone)} | ${convertTime(weatherJson.sys.sunset, weatherJson.timezone)}`;
}


async function getWord(){
  // get the word of the day
  return fetch("http://api.allorigins.win/get?url=https://www.merriam-webster.com/word-of-the-day")
    .then(response => response.text())
    .then((result) => {
      let parser = new DOMParser();
      let doc = parser.parseFromString(result, "text/html");
      let word = doc.querySelector("h1").innerText;

      // get the definition for the word of the day
      return fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${WORD_KEY}`);
    })
    .then(response => response.json());
}

function showWord(){
  document.getElementById("wordOfTheDay").innerText = localStorage.getItem("wordOfTheDay");
  document.getElementById("wordType").innerText = localStorage.getItem("wordType");

  let definitions = JSON.parse(localStorage.getItem("wordDefinitions"));
  document.getElementById("wordDefinition").innerText = "";
  for(let i in definitions){
    document.getElementById("wordDefinition").innerText += "\u2022 " + definitions[i];
    if(i < definitions.length - 1){
      document.getElementById("wordDefinition").innerText += "\n";
    }
  }
}


async function getNumberTrivia(){
  return fetch("http://numbersapi.com/random/trivia")
    .then(response => response.text());
}

function showNumberTrivia(){
  document.getElementById("numberTrivia").innerText = localStorage.getItem("numberTriviaText");
}


function capitalizeFirstLetter(text){
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function convertDegreesToDirection(degrees){
  if (degrees < 22.5) return "N";
  else if (degrees < 67.5) return "NE";
  else if (degrees < 112.5) return "E";
  else if (degrees < 157.5) return "SE";
  else if (degrees < 202.5) return "S";
  else if (degrees < 247.5) return "SW";
  else if (degrees < 292.5) return "W";
  else if (degrees < 337.5) return "NW";
  else return "N";
}

function convertTime(time, timezone){
  return new Date((time + timezone) * 1000).toUTCString().slice(-12, -7);
}
