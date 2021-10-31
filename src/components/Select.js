import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";

export default function Select() {
  const { cities } = useContext(WeatherContext);

  return (
    <div>
      <select>
        {cities.map((city, i) => {
          return (
            <option key={i} value={city.name}>
              {city.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
