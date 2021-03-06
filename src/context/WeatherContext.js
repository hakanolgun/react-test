import { createContext, useState, useEffect } from "react";
import cities from "./data";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [city, setCity] = useState(cities[33]);
  const [weatherData, setWeatherData] = useState([]);

  const [client, setClient] = useState(false);
  const [clientLoc, setClientLoc] = useState({});
  const [clientCity, setClientCity] = useState("");
  const [clientWeather, setClientWeather] = useState([]);

  useEffect(() => {
    async function getWeather() {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.long}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`
      );
      const res = await api_call.json();
      setWeatherData(res.daily);
    }
    getWeather();
  }, [city, setWeatherData, apiKey]);

  const values = {
    cities,
    city,
    setCity,
    weatherData,
    setWeatherData,
    clientLoc,
    setClientLoc,
    clientCity,
    setClientCity,
    clientWeather,
    setClientWeather,
    apiKey,
    client,
    setClient
  };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export default WeatherContext;
