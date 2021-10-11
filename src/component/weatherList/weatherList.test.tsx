import React from "react";
import { render } from "@testing-library/react";
import WeatherList from "./weatherList";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

let container: any = null;
const mockStore = configureStore();
let store: any;
let initialState = { weatherForecast: { error: [] } };
let dataState = {
  weatherForecast: {
    weatherDayList: [
      {
        id: 5772758689513472,
        weather_state_name: "Heavy Cloud",
        weather_state_abbr: "hc",
        wind_direction_compass: "NNW",
        created: "2021-10-10T06:59:01.744346Z",
        applicable_date: "2021-10-10",
        min_temp: 9.48,
        max_temp: 18.245,
        the_temp: 17.585,
        wind_speed: 4.237372847474748,
        wind_direction: 337.5,
        air_pressure: 1029.0,
        humidity: 76,
        visibility: 7.234624791219279,
        predictability: 71,
      },
      {
        id: 6333209240403968,
        weather_state_name: "Heavy Cloud",
        weather_state_abbr: "hc",
        wind_direction_compass: "NNW",
        created: "2021-10-10T06:59:01.726738Z",
        applicable_date: "2021-10-11",
        min_temp: 8.705,
        max_temp: 15.280000000000001,
        the_temp: 14.615,
        wind_speed: 5.231475879914632,
        wind_direction: 335.4999238267924,
        air_pressure: 1030.0,
        humidity: 65,
        visibility: 12.027882168138074,
        predictability: 71,
      },
      {
        id: 6003681565605888,
        weather_state_name: "Showers",
        weather_state_abbr: "s",
        wind_direction_compass: "NNW",
        created: "2021-10-10T06:59:00.975630Z",
        applicable_date: "2021-10-12",
        min_temp: 9.23,
        max_temp: 14.809999999999999,
        the_temp: 15.055,
        wind_speed: 5.431529242607174,
        wind_direction: 336.833541216718,
        air_pressure: 1026.5,
        humidity: 71,
        visibility: 13.307906824146981,
        predictability: 73,
      },
      {
        id: 5036846804369408,
        weather_state_name: "Heavy Cloud",
        weather_state_abbr: "hc",
        wind_direction_compass: "NNW",
        created: "2021-10-10T06:59:01.954429Z",
        applicable_date: "2021-10-13",
        min_temp: 6.545,
        max_temp: 14.27,
        the_temp: 13.855,
        wind_speed: 3.8906443670988096,
        wind_direction: 336.2597228133059,
        air_pressure: 1029.0,
        humidity: 69,
        visibility: 14.248352123598186,
        predictability: 71,
      },
      {
        id: 4925834356850688,
        weather_state_name: "Light Cloud",
        weather_state_abbr: "lc",
        wind_direction_compass: "W",
        created: "2021-10-10T06:59:02.053874Z",
        applicable_date: "2021-10-14",
        min_temp: 7.775,
        max_temp: 16.52,
        the_temp: 15.15,
        wind_speed: 5.188478246088178,
        wind_direction: 264.66717930710007,
        air_pressure: 1029.5,
        humidity: 72,
        visibility: 13.964074803149606,
        predictability: 70,
      },
      {
        id: 4698047301812224,
        weather_state_name: "Light Rain",
        weather_state_abbr: "lr",
        wind_direction_compass: "WNW",
        created: "2021-10-10T06:59:04.226579Z",
        applicable_date: "2021-10-15",
        min_temp: 9.255,
        max_temp: 15.545,
        the_temp: 14.88,
        wind_speed: 4.658909766960948,
        wind_direction: 287.0,
        air_pressure: 1024.0,
        humidity: 80,
        visibility: 9.999726596675416,
        predictability: 75,
      },
    ],
    currentWeather: {
      sun_rise: "2021-10-10T07:16:15.642373+01:00",
      sun_set: "2021-10-10T18:17:44.241747+01:00",
      time: "2021-10-10T08:41:25.865112+01:00",
      title: "London",
      location_type: "City",
      data: {
        id: 5772758689513472,
        weather_state_name: "Heavy Cloud",
        weather_state_abbr: "hc",
        applicable_date: "2021-10-10",
        min_temp: 9.48,
        max_temp: 18.245,
        the_temp: 17.585,
      },
    },
    selectCityId: 44418,
  },
};

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  // unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Weather List first load without data", () => {
  store = mockStore(initialState);
  const utils = render(
    <Provider store={store}>
      <WeatherList />
    </Provider>,
    container
  );
  expect(utils.queryAllByTestId("the-temp")).toHaveLength(0);
});

it("Weather List first load with data", () => {
  store = mockStore(dataState);
  const utils = render(
    <Provider store={store}>
      <WeatherList />
    </Provider>,
    container
  );
  // expect have 6 item in list
  expect(utils.queryAllByTestId("the-temp")).toHaveLength(6);
});
