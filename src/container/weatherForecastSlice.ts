import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CurrentWeather, ItemOption, WeatherDay } from "../props/types";
import { RootState } from "../store/store";
import { fetchCityByText, fetchWeatherCityById } from "./weatherAPI";

export type Toast = {
  message: string;
  type: string;
  id: string;
};
function uuid() {
  return crypto.getRandomValues(new Uint32Array(4)).join("-");
}
export interface WeatherState {
  cities: ItemOption[];
  status: "idle" | "loading" | "failed";
  weatherDayList: WeatherDay[];
  currentWeather: CurrentWeather;
  error: Toast;
}

const initialState: WeatherState = {
  cities: [],
  status: "idle",
  weatherDayList: [],
  currentWeather: {} as CurrentWeather,
  error: {} as Toast,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchCityAsync = createAsyncThunk(
  "counter/fetchCity",
  async (text: string) => {
    const response = await fetchCityByText(text);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const fetchWeatherCityAsync = createAsyncThunk(
  "counter/fetchWeatherCity",
  async (id: number) => {
    const response = await fetchWeatherCityById(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
export const weatherForecastSlice = createSlice({
  name: "weather",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        let cities = action.payload.map((i) => {
          return {
            id: i.woeid,
            text: i.title,
          };
        });
        state.cities = cities;
      })
      .addCase(fetchCityAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = {
          message: "Can't get information of cities",
          id: uuid(),
          type: "error",
        };
      })
      .addCase(fetchWeatherCityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherCityAsync.fulfilled, (state, action) => {
        // just get 7 day of week for show to user
        state.status = "idle";
        state.weatherDayList =
          action.payload?.consolidated_weather.length > 7
            ? action.payload?.consolidated_weather.slice(0, 7)
            : action.payload?.consolidated_weather;
        state.currentWeather = {
          data: state.weatherDayList?.[0],
          location_type: action.payload.location_type,
          sun_rise: action.payload.sun_rise,
          sun_set: action.payload.sun_set,
          title: action.payload.title,
          time: action.payload.time,
        };
      })
      .addCase(fetchWeatherCityAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = {
          message: "Can't get information of city weather",
          id: uuid(),
          type: "error",
        };
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file.
export const selectCities = (state: RootState) => state.weatherForecast.cities;
export const selectWeatherForecast = (state: RootState) =>
  state.weatherForecast.weatherDayList;
export const selectCurrentWeatherForecast = (state: RootState) =>
  state.weatherForecast.currentWeather;
export const selectError = (state: RootState) => state.weatherForecast.error;
export const selectLoading = (state: RootState) =>
  state.weatherForecast.status === "loading";

export default weatherForecastSlice.reducer;
