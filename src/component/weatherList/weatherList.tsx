import React from "react";
import WeatherItem from "../weatherItem/weatherItem";
import { isEmpty } from "lodash";
import { useAppSelector } from "../../store/hook";
import {
  selectCurrentWeatherForecast,
  selectWeatherForecast,
} from "../../container/weatherForecastSlice";
import "./weatherList.css";

const WeatherList: React.FC = () => {
  const currentDay = useAppSelector(selectCurrentWeatherForecast);
  const weatherDayList = useAppSelector(selectWeatherForecast);

  return (
    <div className="weather-list">
      {!isEmpty(currentDay) && (
        <div>
          <p className="city-title">
            Your weather of {currentDay.title} will be:
          </p>
        </div>
      )}
      {weatherDayList && (
        <div className="card-group">
          {weatherDayList.map((item) => {
            return <WeatherItem data={item} key={item.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default WeatherList;
