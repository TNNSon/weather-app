import { render, screen } from "@testing-library/react";
import WeatherItem from "./weatherItem";
import "@testing-library/jest-dom/extend-expect";
import { WeatherDay } from "../../props/types";

let container: any = null;
let initialState: WeatherDay = {
  id: 6281455446523904,
  weather_state_name: "Heavy Cloud",
  weather_state_abbr: "hc",
  wind_direction_compass: "N",
  created: "2021-8-10T00:59:02.258250Z",
  applicable_date: "2021-8-10",
  min_temp: 10.585,
  max_temp: 18.59,
  the_temp: 18.22,
  wind_speed: 3.536735080808081,
  wind_direction: 4.135875309521148,
  air_pressure: 1029.0,
  humidity: 72,
  visibility: 6.242294997216257,
  predictability: 71,
};

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  container.remove();
  container = null;
});

it("Weather Item render", () => {
  const utils = render(<WeatherItem data={initialState} />, container);
  expect(utils.getByRole("heading", { level: 5 }).textContent).toBe("Tuesday");
  expect(screen.getByText("Heavy Cloud")).toBeInTheDocument();
  expect(utils.getByTestId("the-temp").textContent).toContain("18°");
  expect(utils.getByTestId("max-temp").textContent).toContain("19");
  expect(utils.getByTestId("min-temp").textContent).toContain("11°");
  expect(utils.getByTestId("temp-body")).toHaveClass("card-body");
});

it("Weather Item render with current day data", () => {
  initialState.applicable_date = new Date().toString();
  const utils = render(<WeatherItem data={initialState} />, container);
  expect(screen.getByText("Heavy Cloud")).toBeInTheDocument();
  expect(utils.getByTestId("the-temp").textContent).toContain("18°");
  expect(utils.getByTestId("max-temp").textContent).toContain("19");
  expect(utils.getByTestId("min-temp").textContent).toContain("11°");
  expect(utils.getByTestId("temp-body")).toHaveClass("card-body currentDay");
});
