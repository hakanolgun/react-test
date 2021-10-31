import styles from "./styles.module.css";
import { useContext, useEffect } from "react";
import WeatherContext from "../context/WeatherContext";

export default function Select() {
  const {
    cities,
    city,
    setCity,
    clientLoc,
    setClientLoc,
    setClientCity,
    clientCity,
    clientWeather,
    setClientWeather,
    apiKey,
    client,
    setClient,
  } = useContext(WeatherContext);

  function handleChangeCity(e) {
    for (let i = 0; i < cities.length; i++) {
      if (e.target.value === cities[i].name) {
        setCity(cities[i]);
      }
    }
  }

  useEffect(() => {
    function handleClientLocation() {
      navigator.geolocation.getCurrentPosition(function (position) {
        setClientLoc({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
    handleClientLocation();
  }, [setClientLoc]);

  async function fetchLocationName(lat, lng) {
    await fetch(
      "https://www.mapquestapi.com/geocoding/v1/reverse?key=NpKXP3NqkQdXtAEoH4giLBHOg9UjAfq0&location=" +
        lat +
        "%2C" +
        lng +
        "&outFormat=json&thumbMaps=false"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const cityName = JSON.parse(JSON.stringify(responseJson)).results[0]
          .locations[0].adminArea3;
        setClientCity(cityName);
      });
  }

  async function getClientWeather(lat, long) {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`
    );
    const res = await api_call.json();
    setClientWeather(res.daily);
  }

  async function getClientData() {
    await setClient(true);
    await fetchLocationName(clientLoc.lat, clientLoc.long);
    await getClientWeather(clientLoc.lat, clientLoc.long);
  }

  useEffect(() => {
    console.log(clientWeather);
  }, [clientWeather]);

  return (
    <div className={styles.selectContainer}>
      <select
        className={client ? styles.passive : ""}
        value={city.name}
        onChange={handleChangeCity}
      >
        {cities.map((city, i) => {
          return (
            <option key={i} value={city.name}>
              {city.name}
            </option>
          );
        })}
      </select>
      <button className={client ? "" : styles.passive} onClick={getClientData}>
        {clientCity === "" ? "Use My Location" : clientCity}
      </button>
    </div>
  );
}
