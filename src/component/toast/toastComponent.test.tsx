import { render, waitFor } from "@testing-library/react";
import ToastComponent from "./toastComponent";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

let container: any = null;
const mockStore = configureStore();
let store: any;
let initialState = { weatherForecast: { error: [] } };
let dataErrorStore = {
  weatherForecast: {
    error: {
      message: "Show error",
      type: "error",
      id: "1670100033-539964968-931561977-121050302",
    },
  },
};
let dataSuccessStore = {
  weatherForecast: {
    error: {
      message: "Show success message",
      type: "success",
      id: "1670100033-539964968-931561977-121050302",
    },
  },
};
let dataNoTypeToastStore = {
  weatherForecast: {
    error: {
      message: "Show any message",
      id: "1670100033-539964968-931561977-121050302",
    },
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

it("Toast receive error and show message", async () => {
  store = mockStore(dataErrorStore);
  const { container, findByText } = render(
    <Provider store={store}>
      <ToastComponent />
    </Provider>
  );
  // expect toast not exist in ui
  const toast = container.querySelectorAll("div .Toastify__toast-container");
  expect(toast).toHaveLength(0);

  // expect toast show message in ui
  waitFor(() => {
    expect(findByText("Show error")).toHaveLength(1);
  });
});
it("Toast receive success and show message", async () => {
  store = mockStore(dataSuccessStore);
  const { container, findByText } = render(
    <Provider store={store}>
      <ToastComponent />
    </Provider>
  );
  // expect toast not exist in ui
  const toast = container.querySelectorAll("div .Toastify__toast-container");
  expect(toast).toHaveLength(0);

  // expect toast show message in ui
  waitFor(() => {
    expect(findByText("Show success message")).toHaveLength(1);
  });
});
it("Toast receive success and show message", async () => {
  store = mockStore(dataNoTypeToastStore);
  const { container, findByText } = render(
    <Provider store={store}>
      <ToastComponent />
    </Provider>
  );
  // expect toast not exist in ui
  const toast = container.querySelectorAll("div .Toastify__toast-container");
  expect(toast).toHaveLength(0);

  // expect toast show message in ui
  waitFor(() => {
    expect(findByText("Show any message")).toHaveLength(1);
  });
});
