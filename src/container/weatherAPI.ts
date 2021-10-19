import axios from "axios";
import { LocationDetail, LocationProps } from "../ultils/interface";

// A mock function to mimic making an async request for data
export async function fetchCityByText(textSearch = "") {
  try {
    const response = await axios.get<LocationProps[]>(
      `${process.env.REACT_APP_BE_URL}/search/query=${textSearch}`
    );
    return response.data;
  } catch (error) {
    // throw error to show to UI
    throw error;
  }
}

// A mock function to mimic making an async request for data
export async function fetchWeatherCityById(cityId: number) {
  try {
    const response = await axios.get<LocationDetail>(
      `${process.env.REACT_APP_BE_URL}/location/${cityId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
