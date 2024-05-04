import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import clear_icon from '../Assets/clear.png';
import drizzle_icon from '../Assets/drizzle.png'; 
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

export const WeatherApp = () => {
  
  const api_key = "e8d06a4732e4553bc16ff348634dd8e8";
  const [wicon, setWIcon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") return 0;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    
    try {
      let response = await fetch(url);
      const data = await response.json();
    
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
      
      humidity[0].innerHTML = data.main.humidity;
      wind[0].innerHTML = data.wind.speed;
      temperature[0].innerHTML = data.main.temp;
      location[0].innerHTML = data.name;

      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setWIcon(clear_icon);
          break;
        case "02d":
        case "02n":
          setWIcon(cloud_icon);
          break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setWIcon(drizzle_icon);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
          setWIcon(rain_icon);
          break;
        case "13d":
        case "13n":
          setWIcon(snow_icon);
          break;
        default:
          setWIcon(cloud_icon);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Handle other errors, e.g., display an error message to the user
    }
  };

  return (
    <div className='container'>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={() => { search() }}>
          <img src={search_icon} alt="Search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="Weather" />
      </div>
      <div className="weather-temp">24℃</div>
      <div className="weather-location">EX-London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="Humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="Wind Speed" className="icon" />
          <div className="data">
            <div className="wind-rate">18 KM/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
