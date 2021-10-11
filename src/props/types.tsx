type Condition =
  | "sn"
  | "sl"
  | "h"
  | "t"
  | "hr"
  | "lr"
  | "s"
  | "hc"
  | "lc"
  | "c";
type WeatherDay = {
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
};
type LocationProps = {
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
};

type LocationDetail = {
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
};

type CurrentWeather = {
  time: string;
  sun_rise: string;
  sun_set: string;
  title: string;
  location_type: string;
  data: WeatherDay;
};
type ItemOption = {
  id: number;
  text: string;
};
export type {
  Condition,
  WeatherDay,
  LocationProps,
  LocationDetail,
  CurrentWeather,
  ItemOption,
};
