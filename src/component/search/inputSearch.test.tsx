import {
  render,
  fireEvent,
  getByTestId,
  waitFor,
} from "@testing-library/react";
import InputSearch from "./inputSearch";
import "@testing-library/jest-dom/extend-expect";
import configureStore from "redux-mock-store";
import { debounce } from "lodash";

let container: any = null;
const mockStore = configureStore();
let store: any;
let initialState = { weatherForecast: { cities: [] } };
let data = [
  {
    text: "San Francisco",
    id: 2487956,
  },
  {
    text: "San Diego",
    id: 2487889,
  },
  {
    text: "San Jose",
    id: 2488042,
  },
];

let props = {
  onChange: jest.fn(() => {}),
  onSearch: jest.fn(() => {}),
  loading: false,
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

it("renders mount", () => {
  store = mockStore(initialState);
  const utils = render(<InputSearch {...props} data={[]} />, container);
  const input = utils.getByTestId("searchWeather");
  expect(utils.queryAllByTestId("suggestion-container")).toHaveLength(0);
  expect(input).toHaveValue("");
});

it("Inputsearch input data and receive data from props", () => {
  store = mockStore(initialState);
  const { container, rerender, queryAllByTestId } = render(
    <InputSearch {...props} data={[]} loading={false} />
  );
  const input = getByTestId(container, "searchWeather");
  fireEvent.change(input, { target: { value: "San" } });
  expect(input).toHaveValue("San");
  expect(queryAllByTestId("suggestion-container")).toHaveLength(0);
  rerender(<InputSearch {...props} data={data} loading={false} />);

  expect(queryAllByTestId("suggestion-container")).toHaveLength(1);
  expect(container.querySelectorAll("div .list-group-item")).toHaveLength(3);
});

it("Inputsearch receive data from redux", () => {
  store = mockStore(initialState);
  const { container, rerender, queryAllByTestId } = render(
    <InputSearch {...props} data={[]} loading={false} />
  );
  const input = getByTestId(container, "searchWeather");
  fireEvent.change(input, { target: { value: "San" } });
  expect(input).toHaveValue("San");
  expect(queryAllByTestId("suggestion-container")).toHaveLength(0);
  rerender(<InputSearch {...props} data={data} loading={false} />);

  expect(queryAllByTestId("suggestion-container")).toHaveLength(1);
  expect(container.querySelectorAll("div .list-group-item")).toHaveLength(3);
  const option = getByTestId(container, "2487956");
  fireEvent.click(option);

  rerender(<InputSearch {...props} data={data} loading={false} />);
  expect(queryAllByTestId("suggestion-container")).toHaveLength(0);
});

it("Inputsearch - Close suggestion list when click outside", () => {
  store = mockStore(initialState);
  const { container, rerender, queryAllByTestId } = render(
    <InputSearch {...props} data={[]} loading={false} />
  );
  const input = getByTestId(container, "searchWeather");
  fireEvent.change(input, { target: { value: "San" } });
  expect(input).toHaveValue("San");
  expect(queryAllByTestId("suggestion-container")).toHaveLength(0);
  rerender(<InputSearch {...props} data={data} loading={false} />);
  // expect show data after recevice from prop
  expect(queryAllByTestId("suggestion-container")).toHaveLength(1);
  expect(container.querySelectorAll("div .list-group-item")).toHaveLength(3);
  rerender(<InputSearch {...props} data={data} loading={false} />);
  fireEvent.click(document);
  // expect close suggestion list
  expect(container.querySelectorAll("div .list-group-item")).toHaveLength(0);
});
it("Inputsearch - Component have data and re-focus to show suggestion", () => {
  store = mockStore(initialState);
  const { container, rerender, queryAllByTestId } = render(
    <InputSearch {...props} data={[]} loading={false} />
  );
  const input = getByTestId(container, "searchWeather");
  fireEvent.change(input, { target: { value: "San" } });
  expect(input).toHaveValue("San");
  expect(queryAllByTestId("suggestion-container")).toHaveLength(0);
  rerender(<InputSearch {...props} data={data} loading={false} />);
  // expect show data after recevice from prop
  expect(queryAllByTestId("suggestion-container")).toHaveLength(1);
  expect(container.querySelectorAll("div .list-group-item")).toHaveLength(3);
  rerender(<InputSearch {...props} data={data} loading={false} />);
  fireEvent.click(document);
  // expect close suggestion list
  expect(container.querySelectorAll("div .list-group-item")).toHaveLength(0);

  // expect forcus input and show list item again
  input.focus();
  expect(container.querySelectorAll("div .list-group-item")).toHaveLength(3);
});

it("Inputsearch - User input and wait 500ms to call function outside", () => {
  jest.useFakeTimers();
  store = mockStore(initialState);
  const onSearch = jest.fn(() => {});
  const debouncedCallback = debounce(onSearch, 10);
  const { container, rerender, queryAllByTestId } = render(
    <InputSearch
      onChange={jest.fn()}
      onSearch={onSearch}
      data={[]}
      loading={false}
    />
  );

  const input = getByTestId(container, "searchWeather");
  fireEvent.change(input, { target: { value: "San" } });
  expect(input).toHaveValue("San");
  rerender(
    <InputSearch
      onChange={jest.fn()}
      onSearch={onSearch}
      data={[]}
      loading={false}
    />
  );
  // expect after 500ms will to call onSearch prop
  waitFor(() => {
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
