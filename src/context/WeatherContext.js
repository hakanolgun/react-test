import { createContext } from "react";
import cities from "./data";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const values = {
    cities,
  };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export default WeatherContext;
