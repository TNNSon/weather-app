import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import ToastComponent from "./toastComponent";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

let container: any = null;
const mockStore = configureStore();
let store: any;
let initialState = { weatherForecast: { error: [] } };
let dataState = {
  weatherForecast: {
    error: [
      {
        action: "Show error",
        type: "Error",
        id: "1670100033-539964968-931561977-121050302",
      },
    ],
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

it("App run first time will not show any toast", () => {
  store = mockStore(initialState);
  const utils = render(
    <Provider store={store}>
      <ToastComponent />
    </Provider>,
    container
  );
  const input = utils.queryAllByTestId("toast");
  expect(input).toHaveLength(0);
});

it("Toast receive error", () => {
  jest.useFakeTimers();
  store = mockStore(dataState);
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ToastComponent />
      </Provider>,
      container
    );
  });
  const toast = container.querySelectorAll("div .fade.toast.show");
  expect(toast).toHaveLength(1);

  // check toast will destroy after 3000
  setTimeout(() => {
    const toast1 = container.querySelectorAll("div .fade.toast.show");
    expect(toast1).toHaveLength(0);
  }, 3005);
});
