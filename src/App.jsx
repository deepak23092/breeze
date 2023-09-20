import { React } from "react";
import "./App.css";
import CurrentLocation from "./components/currentLocation";
import WeatherState from "./context/WeatherState";


function App() {

  return (
    <>

      <WeatherState>

        <div className="home flex flex-col justify-center items-center w-screen h-screen">
          <h1 className="text-center font-Courgette text-3xl text-white m-3 border-b">Welcome to the Weather Dashboard</h1><br></br>
          <div className="text-white md:w-2/3 h-3/4">

            <div className="flex h-full flex-col md:flex-row">
              <CurrentLocation />
            </div>

          </div>
        </div>

      </WeatherState>

    </>
  );
}

export default App;
