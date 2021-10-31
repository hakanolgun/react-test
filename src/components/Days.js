import styles from "./styles.module.css";
import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";

export default function Days() {
  const { weatherData } = useContext(WeatherContext);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div>
      {weatherData.map((day, i) => (
        <div className={styles.dayDiv}>
          <p>{days[new Date(day.dt * 1000).getDay()]}</p>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <div>
            <span>{Math.round(day.temp.max)} &#176;C</span>
            <span> </span>
            <span>{Math.round(day.temp.min)} &#176;C</span>
          </div>
        </div>
      ))}
    </div>
  );
}
