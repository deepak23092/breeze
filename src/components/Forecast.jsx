import { React, useContext, useState } from 'react'
import weatherContext from "../context/weatherContext"
import ReactAnimatedWeather from "react-animated-weather";
import axios from 'axios';

const Forecast = () => {

  const API_KEY = '534ffc3d206e647c2af87a7033da5c5e';

  const context = useContext(weatherContext);
  const { weatherData, setWeatherData } = context;
  const { city, country, temperatureC, humidity, visibility, windSpeed, main, icon } = weatherData;

  const [searchedCity, setSearchedCity] = useState("")

  const handleInput = (e) => {
    setSearchedCity(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(apiUrl);

      const { data } = response;

      let weatherIcon;

      switch (data.weather[0].main) {
        case "clear":
          weatherIcon = "CLEAR_DAY";
          break;
        case "Haze":
          weatherIcon = "PARTLY_CLOUDY_DAY";
          break;
        case "Clouds":
          weatherIcon = "CLOUDY";
          break;
        case "Rain":
          weatherIcon = "RAIN";
          break;
        case "Thunderstorm":
          weatherIcon = "RAIN";
          break;
        case "Snow":
          weatherIcon = "SNOW";
          break;
        case "Dust":
          weatherIcon = "WIND";
          break;
        case "Drizzle":
          weatherIcon = "SLEET";
          break;
        case "Fog":
          weatherIcon = "FOG";
          break;
        case "Mist":
          weatherIcon = "FOG";
          break;
        case "Smoke":
          weatherIcon = "FOG";
          break;
        case "Tornado":
          weatherIcon = "WIND";
          break;
        case "Squalls":
          weatherIcon = "WIND";
          break;
        default:
          weatherIcon = "CLEAR_DAY";
      }

      setWeatherData({
        city: data.name,
        temperatureC: data.main.temp,
        humidity: data.main.humidity,
        main: data.weather[0].main,
        country: data.sys.country,
        visibility: data.visibility,
        windSpeed: data.wind.speed,
        icon: weatherIcon
      });

      setSearchedCity("");

    } catch (error) {
      console.error("Error fetching weather data for the searched city:", error);
    }
  }

  return (
    <div className='md:w-2/5 bg-black opacity-80 flex items-center justify-center flex-col py-3'>

      <ReactAnimatedWeather icon={icon} color="white" size={74} animate />

      {/* <i className="fa-regular fa-sun text-6xl"></i> */}
      <h1 className='md:text-4xl text-2xl mt-4 font-semibold'>{main}</h1>
      <div className='w-80 h-[1px] bg-slate-400 mt-2'></div>

      <form className='mt-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='Search any city' onChange={handleInput} value={searchedCity} className='bg-inherit border-b border-slate-500 p-1 outline-none mx-2' />
        <button type='submit' className="fa-solid fa-magnifying-glass"></button>
      </form>

      <h4 className='mt-4 font-semibold'>{city}, {country}</h4>

      <div className='mt-2'>
        <div className='border-t border-slate-500 my-2 w-64'></div>
        <div className='flex justify-around font-semibold'>
          <span>Temperature</span>
          <span>{temperatureC}&deg;c ({main})</span>
        </div>

        <div className='border-t border-slate-500 my-2 w-64'></div>
        <div className='flex justify-around font-semibold'>
          <span>Humidity</span>
          <span>{humidity}%</span>
        </div>

        <div className='border-t border-slate-500 my-2 w-64'></div>
        <div className='flex justify-around font-semibold'>
          <span>Visibility</span>
          <span>{visibility} m</span>
        </div>

        <div className='border-t border-slate-500 my-2 w-64'></div>
        <div className='flex justify-around font-semibold'>
          <span>Wind Speed</span>
          <span>{windSpeed} km/h</span>
        </div>
      </div>


    </div>
  )
}

export default Forecast;

