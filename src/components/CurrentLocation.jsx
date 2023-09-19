import { React, useContext } from 'react';
import weatherContext from "../context/weatherContext"

const CurrentLocation = () => {

    const context = useContext(weatherContext);
    const { weatherData } = context;

    const { city, country, temperatureC } = weatherData;

    return (

        <div className='currentloc w-3/5 h-full relative'>
            <h2 className='absolute left-4 top-2 text-2xl font-semibold'>{city}</h2>
            <h3 className='absolute left-4 top-9 text-xl'>{country}</h3>
            <p className='absolute right-12 bottom-6 text-5xl'>{temperatureC}&deg;c</p>
        </div>

    )
}
export default CurrentLocation;

