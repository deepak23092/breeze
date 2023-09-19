import { useState, useEffect } from "react";
import WeatherContext from "./weatherContext"
import axios from "axios";

const WeatherState = (props) => {

    const API_KEY = '534ffc3d206e647c2af87a7033da5c5e';

    const [weatherData, setWeatherData] = useState({
        lat: null,
        lon: null,
        city: null,
        temperatureC: null,
        humidity: null,
        main: null,
        country: null,
        visibility: null,
        windSpeed: null,
        icon: "CLEAR_DAY"
    });

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
            console.error('Geolocation is not supported.');
        }

        function successCallback(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Use latitude and longitude to fetch location details or display on a map
            getWeather(latitude, longitude);
        }

        function errorCallback(error) {
            console.error('Error getting geolocation:', error);
        }

    }, [])

    const getWeather = async (lat, lon) => {

        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${API_KEY}`;

            const response = await axios.get(apiUrl);

            const { data } = response

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
                lat: lat,
                lon: lon,
                city: data.name,
                temperatureC: data.main.temp,
                humidity: data.main.humidity,
                main: data.weather[0].main,
                country: data.sys.country,
                visibility: data.visibility,
                windSpeed: data.wind.speed,
                icon: weatherIcon
            });

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    return (
        <div>
            <WeatherContext.Provider value={{ weatherData, setWeatherData }} >
                {props.children}
            </WeatherContext.Provider>
        </div>
    )
}

export default WeatherState;

