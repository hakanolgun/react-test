import { createContext, useState } from "react";
import cities from "./data";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(cities[54]);

  const values = {
    cities,
    city,
    setCity
  };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export default WeatherContext;
