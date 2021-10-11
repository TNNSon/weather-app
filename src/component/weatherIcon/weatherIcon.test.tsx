import { render } from "@testing-library/react";
import WeatherIcon from "./weatherIcon";
import "@testing-library/jest-dom/extend-expect";
import configureStore from "redux-mock-store";

let container: any = null;
const mockStore = configureStore();
let store: any;
let initialState = { weatherForecast: { cities: [] } };
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
