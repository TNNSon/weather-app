import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import weatherForecastReducer from "../container/weatherForecastSlice";

export const store = configureStore({
  reducer: {
    weatherForecast: weatherForecastReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
