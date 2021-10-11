import React, { Component } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import {
  render,
  fireEvent,
  getByTestId,
  waitFor,
} from "@testing-library/react";
import InputSearch from "./inputSearch";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { shallow, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import axios from "axios";
import { debounce } from "lodash";
// const spy = jest.spyOn(redux, "useSelector");
// spy.mockReturnValue({ cities: [] });

let container: any = null;
const mockStore = configureStore();
let store: any, rWrapped: ReactWrapper, sWrapped: ShallowWrapper;
let initialState = { weatherForecast: { cities: [] } };
// let resultState = {
//   weatherForecast: {
//     cities: [
//       {
//         title: "San Francisco",
//         location_type: "City",
//         woeid: 2487956,
//         latt_long: "37.777119, -122.41964",
//       },
//       {
//         title: "San Diego",
//         location_type: "City",
//         woeid: 2487889,
//         latt_long: "32.715691,-117.161720",
//       },
//       {
//         title: "San Jose",
//         location_type: "City",
//         woeid: 2488042,
//         latt_long: "37.338581,-121.885567",
//       },
//     ],
//   },
// };
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
  // store = mockStore(resultState);
  // const fn = jest.fn();
  // sWrapped = shallow(
  //   <Provider store={store}>
  //     <InputSearch {...props} data={}/>
  //   </Provider>
  // );
  // rWrapped = mount(
  //   <Provider store={store}>
  //     <InputSearch />
  //   </Provider>
  // );
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

// it("Inputsearch - User input and wait 500ms to call function outside", () => {
//   jest.useFakeTimers();
//   store = mockStore(initialState);
//   const onSearch = jest.fn(() => {});
//   const { container, rerender, queryAllByTestId } = render(
//     <InputSearch
//       onChange={jest.fn()}
//       onSearch={onSearch}
//       data={[]}
//       loading={false}
//     />
//   );
//   const input = getByTestId(container, "searchWeather");
//   fireEvent.change(input, { target: { value: "San" } });
//   expect(input).toHaveValue("San");
//   rerender(
//     <InputSearch
//       onChange={jest.fn()}
//       onSearch={onSearch}
//       data={[]}
//       loading={false}
//     />
//   );
//   // expect after 500ms will to call onSearch prop
//   waitFor(() => {
//     expect(onSearch).toHaveBeenCalledTimes(1);
//   });
// });
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

// it("Inputsearch receive data from redux", () => {
//   jest.useFakeTimers();
//   act(() => {
//     ReactDOM.render(<InputSearch {...props} data={data} />, container);
//   });
//   setTimeout(() => {
//     const toast1 = container.querySelectorAll("div .list-group-item");
//     expect(toast1).toHaveLength(5);
//   }, 3005);
//   const input = utils.getByTestId("searchWeather");
//   fireEvent.change(input, { target: { value: "San" } });
//   // expect(input).toHaveValue("San");
//   // // const input1 = utils.getByTestId("searchWeather");
//   // const displaySuggestion = utils.getByTestId("suggestion-container");
//   // expect(displaySuggestion).toBeVisible();
//   //  expect(input.).toca.toHaveBeenCalledTimes(1);
// });
// it("Inputsearch receive data from redux and use select 1 option", () => {
//   store = mockStore(resultState);
//   const utils = render(
//     // <Provider store={store}>
//     <InputSearch {...props} data={data} />,
//     // </Provider>,
//     container
//   );
//   const handleSelect = jest.fn();
//   const input = utils.getByTestId("searchWeather");
//   const displaySuggestion = utils.getByTestId("suggestion-container");
//   expect(displaySuggestion).toBeVisible();
//   const option = utils.getByText("San Diego");
//   expect(displaySuggestion.childElementCount).toBe(3);
//   fireEvent.click(option);
//   //check reset state after click option
//   expect(input).toHaveValue("");
//   expect(displaySuggestion).not.toBeVisible();
//   expect(utils.queryByTestId(".suggestion-container")).not.toBeInTheDocument();
// });
// it("simulates click events", () => {
//   // console.log(sWrapped.dive().state());
//   expect(sWrapped.find(".list-group-item")).toBeDefined();
//   // sWrapped.dive().find("InputSearch");
//   let inputSearch = sWrapped.dive().find("InputSearch");
//   expect(sWrapped.find(".list-group-item")).toBe(3);
//   // expect(inputSearch.state("textSearch")).toBe("");
//   // sWrapped.find(".list-group-item").simulate("click");
//   // expect(onButtonClick).to.have.property("callCount", 1);
// });
