import React, { useState } from "react";
import { render } from "react-dom";
//import ReactDOM from "react-dom/client";
//import "./index.css";
//import App from "./App";
import axios from "axios";
//import { render } from "react-dom/cjs/react-dom.production.min";

const WeatherApp = () => {
  const [temperature, setTemperature] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("Lisboa");
  const [country, setCountry] = useState("PT");

  const getWeatherData = (city, country) => {
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=bae4b9812e732c245bcd888a9b3be7a6`,
    })
      .then((response) => {
        console.log(response.data.main.temp);
        setTemperature(response.data.main.temp - 273.15);
        setDesc(response.data.weather[0].main);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70px",
          width: "100%",
          backgroundColor: "#226ba3",
          fontSize: "30px",
          color: "#fff",
        }}
      >
        Meteorologia de {city}
      </div>
      <div
        style={{
          height: "5px",
          width: "100%",
          backgroundColor: "green",
        }}
      ></div>
      <br />
      <div style={{ marginLeft: "33%" }}>
        <div
          style={{
            height: "150px",
            width: "450px",
            backgroundColor: "green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "25px",
          }}
        >
          {new Date().toLocaleDateString()}
          <br />
          {city} Temperatura
          <br />
          {Math.round(temperature * 100) / 100} ªC .{desc}
        </div>
        <br />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
          onClick={() => {
            getWeatherData(city, country);
          }}
        >
          VER
        </button>
      </div>
    </>
  );
};

render(<WeatherApp />, document.querySelector("#root"));
