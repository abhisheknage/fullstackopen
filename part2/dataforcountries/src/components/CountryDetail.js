import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryDetail = ({ countryDetail }) => {
  //   console.log(countryDetail);
  // console.log("Rendering country detail");
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: "",
    weather_icons: [""],
    wind_speed: "",
    wind_dir: "",
  });
  useEffect(() => {
    console.log("Executing UseEffect in CountryDetail");
    const api_key = process.env.REACT_APP_API_KEY;
    console.log("API key is ", api_key);
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryDetail.name.common}`
      )
      .then((res) => {
        console.log("weather info", res.data);
        setWeatherInfo(res.data.current);
      });
  }, []);
  return (
    <div>
      <h1>{countryDetail.name.common}</h1>
      <p>capital {countryDetail.capital[0]}</p>
      <p>population {countryDetail.population}</p>
      <br />
      <h2>languages</h2>
      <ol>
        {Object.entries(countryDetail.languages).map((language) => (
          <li>{language[1]}</li>
        ))}
      </ol>
      <h1>{countryDetail.flag}</h1>
      <h1>Weather in {countryDetail.name.common}</h1>
      <p>temperature: {weatherInfo.temperature} Celcius</p>
      <img src={weatherInfo.weather_icons[0]} alt="" />
      <p>
        wind: {weatherInfo.wind_speed} mph direction {weatherInfo.wind_dir}
      </p>
    </div>
  );
};

export default CountryDetail;
