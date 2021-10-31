import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";

export default function Select() {
  const { cities, city, setCity } = useContext(WeatherContext);

  function handleChangeCity(e) {
    for (let i = 0; i < cities.length; i++) {
      if (e.target.value === cities[i].name) {
        setCity(cities[i]);
      }
    }
  }

  return (
    <div>
      <select value={city.name} onChange={handleChangeCity}>
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
