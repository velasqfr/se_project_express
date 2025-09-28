import { checkResponse } from "../utils/api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: data.main.temp,
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  result.condition = mapCondition(data.weather[0].main);
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000; //if now is in between sunrise & sunset, it'll return true
}; //we're converting sunrise from seconds to milliseconds (1000 mili in a sec)

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

const mapCondition = (apiCondition) => {
  const conditionMap = {
    Clear: "clear",
    Clouds: "cloudy",
    Mist: "fog",
    Fog: "fog",
    Haze: "fog",
    Rain: "rain",
    Drizzle: "rain",
    Thunderstorm: "storm",
    Snow: "snow",
  };

  return conditionMap[apiCondition] || "clear";
};

//IF res.ok (the response) has an ok property that it is true, then we are going to parse the ajacent in the response
// & return it, IF not then we're going to reject the promise

///////////////////////////OPTIONAL TASK:////////////////////////////////////////////////

// 1. Added "mapCondition()" to translate weather conditions like "storm, fog, snow, rain"//
// 2. Replaced ".toLowerCase()" with a call to "mapCondition()"
