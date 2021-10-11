import React from "react";
import { Condition } from "../../props/types";

type LocationProps = {
  type?: Condition;
};

//www.metaweather.com/static/img/weather/sn.svg
const WeatherIcon: React.FC<LocationProps> = ({ type }) => {
  switch (type) {
    case "sn": {
      return (
        <i data-testid="weather-icon" className="bi bi-cloud-snow fa-3x"></i>
      );
    }
    case "sl": {
      return <i data-testid="weather-icon" className="bi bi-cloud-sleet"></i>;
    }
    case "h": {
      return <i data-testid="weather-icon" className="bi bi-cloud-hail"></i>;
    }
    case "t": {
      return (
        <i data-testid="weather-icon" className="bi bi-cloud-lightning"></i>
      );
    }
    case "hr": {
      return (
        <i data-testid="weather-icon" className="bi bi-cloud-rain-heavy"></i>
      );
    }
    case "lr": {
      return (
        <i
          data-testid="weather-icon"
          className="bi bi-cloud-lightning-rain"
        ></i>
      );
    }
    case "s": {
      return <i data-testid="weather-icon" className="bi bi-cloud-sun"></i>;
    }
    case "hc": {
      return <i data-testid="weather-icon" className="bi bi-clouds"></i>;
    }
    case "lc": {
      return <i data-testid="weather-icon" className="bi bi-cloud-sun"></i>;
    }
    case "c": {
      return (
        <i data-testid="weather-icon" className="bi bi-brightness-high"></i>
      );
    }
    default: {
      return null;
    }
  }
};

export default WeatherIcon;
