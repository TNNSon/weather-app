import React from "react";
import InputSearch from "../component/search/inputSearch";
import WeatherList from "../component/weatherList/weatherList";
import { useAppSelector, useAppDispatch } from "../store/hook";
import {
  fetchCityAsync,
  fetchWeatherCityAsync,
  selectCities,
  selectLoading,
} from "./weatherForecastSlice";
import "./weatherForecast.css";
const WeatherForecast: React.FC = () => {
  const cities = useAppSelector(selectCities);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  const handleChange = (value: number) => {
    dispatch(fetchWeatherCityAsync(value));
  };
  const handleSearch = (textSearch: string) => {
    dispatch(fetchCityAsync(textSearch));
  };

  return (
    <section className="container shadow bg-white rounded">
      <h1>Weather App</h1>
      <InputSearch
        onSearch={handleSearch}
        onChange={handleChange}
        data={cities}
        loading={loading}
      />
      <WeatherList />
    </section>
  );
};

export default WeatherForecast;
