import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

test("renders app", () => {
  const { getByTestId, queryAllByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(queryAllByText("Your weather of")).toHaveLength(0);
  waitFor(() => {
    expect(getByTestId("searchWeather")).toHaveValue("");
  });
});
