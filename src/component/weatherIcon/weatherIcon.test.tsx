import React, { Component } from "react";
import { act } from "react-dom/test-utils";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import WeatherIcon from "./weatherIcon";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { shallow, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import axios from "axios";
// const spy = jest.spyOn(redux, "useSelector");
// spy.mockReturnValue({ cities: [] });

let container: any = null;
const mockStore = configureStore();
let store: any, rWrapped: ReactWrapper, sWrapped: ShallowWrapper;
let initialState = { weatherForecast: { cities: [] } };
let resultState = {
  weatherForecast: {
    cities: [
      {
        title: "San Francisco",
        location_type: "City",
        woeid: 2487956,
        latt_long: "37.777119, -122.41964",
      },
      {
        title: "San Diego",
        location_type: "City",
        woeid: 2487889,
        latt_long: "32.715691,-117.161720",
      },
      {
        title: "San Jose",
        location_type: "City",
        woeid: 2488042,
        latt_long: "37.338581,-121.885567",
      },
    ],
  },
};
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  // store = mockStore(resultState);
  // sWrapped = shallow(
  //   <Provider store={store}>
  //     <WeatherIcon type='c'/>
  //   </Provider>
  // );
  // rWrapped = mount(
  //   <Provider store={store}>
  //     <WeatherIcon />
  //   </Provider>
  // );
});

afterEach(() => {
  // cleanup on exiting
  // unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Weather Icon render with prop type = c", () => {
  store = mockStore(initialState);
  const utils = render(<WeatherIcon type="c" />, container);

  expect(utils.getAllByTestId("weather-icon")).toHaveLength(1);
  expect(utils.getAllByTestId("weather-icon")[0].className).toContain(
    "bi bi-brightness-high"
  );
});
it("Weather Icon render with prop type = sn", () => {
  store = mockStore(initialState);
  const utils = render(<WeatherIcon type="sn" />, container);

  expect(utils.getAllByTestId("weather-icon")).toHaveLength(1);
  expect(utils.getAllByTestId("weather-icon")[0].className).toContain(
    "bi bi-cloud-snow"
  );
});
it("Weather Icon render with prop type = sl", () => {
  store = mockStore(initialState);
  const utils = render(<WeatherIcon type="sl" />, container);

  expect(utils.getAllByTestId("weather-icon")).toHaveLength(1);
  expect(utils.getAllByTestId("weather-icon")[0].className).toContain(
    "bi bi-cloud-sleet"
  );
});
it("Weather Icon render with prop type = h", () => {
  store = mockStore(initialState);
  const utils = render(<WeatherIcon type="h" />, container);

  expect(utils.getAllByTestId("weather-icon")).toHaveLength(1);
  expect(utils.getAllByTestId("weather-icon")[0].className).toContain(
    "bi bi-cloud-hail"
  );
});
it("Weather Icon render with prop type = t", () => {
  store = mockStore(initialState);
  const utils = render(<WeatherIcon type="t" />, container);

  expect(utils.getAllByTestId("weather-icon")).toHaveLength(1);
  expect(utils.getAllByTestId("weather-icon")[0].className).toContain(
    "bi bi-cloud-lightning"
  );
});
it("Weather Icon render with prop type = hr", () => {
  store = mockStore(initialState);
  const utils = render(<WeatherIcon type="hr" />, container);

  expect(utils.getAllByTestId("weather-icon")).toHaveLength(1);
  expect(utils.getAllByTestId("weather-icon")[0].className).toContain(
    "bi bi-cloud-rain-heavy"
  );
});
it("Weather Icon render with prop type = lr", () => {
  store = mockStore(initialState);
  const utils = render(<WeatherIcon type="lr" />, container);

  expect(utils.getAllByTestId("weather-icon")).toHaveLength(1);
  expect(utils.getAllByTestId("weather-icon")[0].className).toContain(
    "bi bi-cloud-lightning-rain"
  );
});
it("Weather Icon render with prop type = s", () => {
  store = mockStore(initialState);
  const utils = render(<WeatherIcon type="s" />, container);

  expect(utils.getAllByTestId("weather-icon")).toHaveLength(1);
  expect(utils.getAllByTestId("weather-icon")[0].className).toContain(
    "bi bi-cloud-sun"
  );
});
it("Weather Icon render with prop type = hc", () => {
  store = mockStore(initialState);
  const utils = render(<WeatherIcon type="hc" />, container);

  expect(utils.getAllByTestId("weather-icon")).toHaveLength(1);
  expect(utils.getAllByTestId("weather-icon")[0].className).toContain(
    "bi bi-clouds"
  );
});
it("Weather Icon render with prop type = lc", () => {
  store = mockStore(initialState);
  const utils = render(<WeatherIcon type="lc" />, container);

  expect(utils.getAllByTestId("weather-icon")).toHaveLength(1);
  expect(utils.getAllByTestId("weather-icon")[0].className).toContain(
    "bi bi-cloud-sun"
  );
});
it("Weather Icon render without prop type will no render", () => {
  store = mockStore(initialState);
  const utils = render(<WeatherIcon />, container);

  expect(utils.queryAllByTestId("weather-icon")).toHaveLength(0);
});
