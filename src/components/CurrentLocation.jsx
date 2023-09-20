import { React, useContext } from 'react';
import weatherContext from "../context/weatherContext"
import Forecast from './forecast';

const CurrentLocation = () => {

    const context = useContext(weatherContext);
    const { weatherData } = context;

    const { city, country, temperatureC, main } = weatherData;

    const bgImage = () => {
        if (main === "Clear") return "/weather/clear.jpg";
        else if (main === "Haze") return "/weather/haze2.jpg"
        else if (main === "Clouds") return "/weather/clouds.jpg"
        else if (main === "Rain") return "/weather/rain.jpg"
        else if (main === "Thunderstorm") return "/weather/thunderstorm.jpg"
        else if (main === "Snow") return "/weather/snow.jpg"
        else if (main === "Dust") return "/weather/dust.jpg"
        else if (main === "Drizzle") return "/weather/drizzle.jpg"
        else if (main === "Fog") return "/weather/fog.jpg"
        else if (main === "Mist") return "/weather/fog.jpg"
        else if (main === "Smoke") return "/weather/fog.jpg"
        else if (main === "Tornado") return "/weather/tornado.jpg"
        else if (main === "Squalls") return "/weather/wind.jpg"
        else return "/weather/clear.jpg"
    }

    const backgroundImage = {
        backgroundImage: `url('${bgImage()}')`,
        backgroundSize: 'cover',
    };

    if (temperatureC) {
        return (
            <>
                <div className={`currentloc w-3/5 h-full relative`} style={backgroundImage}>
                    <h2 className='absolute left-4 top-2 text-2xl font-semibold'>{city}</h2>
                    <h3 className='absolute left-4 top-9 text-xl'>{country}</h3>
                    <p className='absolute right-12 bottom-6 text-5xl'>{temperatureC}&deg;c</p>
                </div>

                <Forecast />
            </>
        )

    }
    else {
        return (
            <section className='w-full h-full bg-black flex items-center flex-col bg-opacity-60'>
                <img src="/images/WeatherIcons.gif" alt="" className='w-72' />
                <p className='text-lg font-semibold text-white'>Detecting your location</p>
                <p className='w-96 text-center mt-2'>Your current location will be displayed on the App & used for calculating Real time weather</p>
            </section>
        )
    }
}
export default CurrentLocation;

