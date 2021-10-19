import { round } from "lodash";
import React from "react";
import { WeatherDay } from "../../ultils/interface";
import WeatherIcon from "../weatherIcon/weatherIcon";
import "./weatherItem.css";

type LocationProps = {
  data: WeatherDay;
};

export const isToday = (date: string) => {
  const someDate = new Date(date);
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const getDayName = (dateStr: string, locale: string = "en-us") => {
  let today = isToday(dateStr);
  var date = new Date(dateStr);
  date.toLocaleDateString(locale, { weekday: "long" });
  return today
    ? "Today"
    : date.toLocaleDateString(locale, { weekday: "long", day: "numeric" });
};

const WeatherItem: React.FC<LocationProps> = ({ data }) => {
  return (
    <div className="card">
      <div
        data-testid="temp-body"
        className={`card-body ${
          isToday(data.applicable_date) ? "currentDay" : ""
        }`}
      >
        <h5 className="card-title">{getDayName(data.applicable_date)}</h5>
        <p className="card-text the-temp" data-testid="the-temp">
          {round(data.the_temp)}&deg;
        </p>
        <p className="card-text">
          <span className="max-temp" data-testid="max-temp">
            {round(data.max_temp)}&deg;
          </span>{" "}
          -{" "}
          <span className="min-temp" data-testid="min-temp">
            {round(data.min_temp)}&deg;
          </span>
        </p>
        <WeatherIcon type={data.weather_state_abbr} />
        <p className="card-text">{data.weather_state_name}</p>
      </div>
    </div>
  );
};

export default WeatherItem;
