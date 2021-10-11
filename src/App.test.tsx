import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

test("renders app", () => {
  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByTestId("searchWeather")).toHaveValue("");
  expect(getByText("Current day")).toBeInTheDocument();
});
