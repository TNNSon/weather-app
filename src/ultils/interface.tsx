import { Condition } from "./types";

interface WeatherDay {
  id: number;
  weather_state_name: string;
  weather_state_abbr: Condition;
  wind_direction_compass: string;
  created: string;
  applicable_date: string;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  wind_speed: number;
  wind_direction: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
}

interface LocationProps {
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
}

interface LocationDetail {
  consolidated_weather: WeatherDay[];
  time: string;
  sun_rise: string;
  sun_set: string;
  timezone_name: string;
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
  timezone: string;
}

interface CurrentWeather {
  time: string;
  sun_rise: string;
  sun_set: string;
  title: string;
  location_type: string;
  data: WeatherDay;
}
interface ItemOption {
  id: number;
  text: string;
}
export type {
  WeatherDay,
  LocationProps,
  LocationDetail,
  CurrentWeather,
  ItemOption,
};
